import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { sleep } from '@gurban/kit/utils/async-utils';
import { notNull } from '@gurban/kit/utils/flow/flow-utils';
import { retrying } from '@gurban/kit/utils/flow/retrying';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, StoredFile, UploadSession } from '@poslah/database/generated/db-client/client';
import { DbService } from '@poslah/util/modules/db-module/db.service';
import { isPrismaClientError } from '@poslah/util/modules/db-module/util';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { CacheService } from '@poslah/util/modules/nosql/redis/cache.service';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod/v4';

import { FilesRepository } from './files.repository';
import { S3Service } from './s3.service';

export const reportArgsSchema = z.object({
  eTag: z.string(),
  status: z.uint32().gte(400).lte(599),
  message: z.string().optional(),
});

export type ReportArgs = { eTag?: string; status?: number; message?: string };

export const guideUploadResponseSchema = z.object({
  type: z.literal('upload'),
  uploads: z.array(
    z.object({
      partNumber: z.number().int(),
      chunkId: z.uuid(),
    })
  ),
});

export const guideFileResponseSchema = z.object({
  type: z.literal('file'),
  file: z.object({
    id: z.string(),
    cdnUrl: z.string(),
  }),
});

export const guideFailedResponseSchema = z.object({
  type: z.literal('failed'),
  error: z.string(),
});

export const guideResponseSchema = z.discriminatedUnion('type', [
  guideUploadResponseSchema,
  guideFileResponseSchema,
  guideFailedResponseSchema,
]);
export type GuideResponseDto = z.infer<typeof guideResponseSchema>;

export interface InitiateUploadInput {
  checksum: string;
  sizeBytes: bigint;
  originalFilename: string;
  mimeType: string;
  totalChunks: number;
  parallel?: number;
}

export interface GetLinkArgs {
  checksumSha256: string;
}

export interface GetLinkResponseDto {
  upload: string;
  reportToken: string;
}

export type UploadSessionSelectPayload<S extends Prisma.UploadSessionSelect> =
  Prisma.UploadSessionGetPayload<{ select: S }>;

@Injectable()
export class FilesService {
  private readonly reportTokenTTLSec = 3900;
  private readonly pollingIntervalMs = 200;
  private readonly finalizationTimeoutMs = 60000;
  private readonly maxSessionFailures = 20;
  private readonly minChunkSizeBytes = BigInt(5 * 1024 * 1024); // 5 MB
  private readonly maxChunkSizeBytes = BigInt(50 * 1024 * 1024); // 50 MB

  constructor(
    private readonly loggerBase: Logger,
    private readonly db: DbService,
    private readonly s3: S3Service,
    private readonly cache: CacheService,
    private readonly repository: FilesRepository
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, FilesService.name);
  }

  async createOrJoinUploadSession(input: InitiateUploadInput, userId: string): Promise<GuideResponseDto> {
    const { checksum, sizeBytes, parallel = 4 } = input;

    return retrying(
      error => isPrismaClientError(error) && isPrismaClientError.uniqueConstraintFailed(error),
      async () => {
        const existingFile = await this.repository.tryFindStoredFile(checksum, sizeBytes, {
          id: true,
          cdnUrl: true,
          uploadSession: { select: { id: true } },
        });

        if (existingFile) {
          if (!existingFile.uploadSession) {
            return {
              type: 'file',
              file: { id: existingFile.id, cdnUrl: existingFile.cdnUrl },
            };
          }
          return this.makeGuideResponse(existingFile.uploadSession.id, parallel);
        }

        const newSession = await this.createNewUploadSession(input, userId);
        return this.makeGuideResponse(newSession.id, parallel);
      }
    );
  }

  async getUrlForChunk(chunkId: string, args: GetLinkArgs): Promise<GetLinkResponseDto> {
    const { checksumSha256 } = args;
    return this.db.inOwnTransaction(async () => {
      const chunk = await this.repository.tryFindUploadChunk(chunkId, {
        id: true,
        eTag: true,
        partNumber: true,
        session: { select: { id: true, file: true, storageUploadId: true } },
      });

      if (!chunk || !chunk.session?.file || chunk.eTag) {
        throw new NotFoundException(`Chunk ${chunkId} not found or already uploaded.`);
      }

      const {
        session,
        session: { file },
      } = chunk;
      const preSignedUrl = await this.s3.getSignedUrlForPart(
        file.id, // Using file.id as storageKey
        session.storageUploadId!,
        chunk.partNumber,
        checksumSha256
      );

      const reportToken = uuidv4();
      const redisKey = `upload:report-token:${reportToken}`;
      const redisValue = JSON.stringify({ sessionId: session.id, chunkId: chunk.id });
      await this.cache.setKey(redisKey, redisValue, { ttl: this.reportTokenTTLSec });

      await this.repository.uploadChunkHasLeased(chunkId);

      return {
        upload: preSignedUrl,
        reportToken,
      };
    });
  }

  async reportChunk(reportToken: string, body: ReportArgs, parallel: number = 4): Promise<GuideResponseDto> {
    const redisKey = `upload:report-token:${reportToken}`;
    const tokenDataJson = await this.cache.getAndDeleteKey(redisKey);
    if (!tokenDataJson) {
      throw new ForbiddenException('Invalid or expired report token.');
    }

    const { sessionId, chunkId } = JSON.parse(tokenDataJson);

    if (body.eTag) {
      await this.handleChunkSuccess(chunkId, body.eTag);
    } else {
      await this.handleChunkFailure(sessionId, { status: body.status, message: body.message });
    }

    return this.makeGuideResponse(sessionId, parallel);
  }

  private async handleChunkSuccess(chunkId: string, eTag: string): Promise<void> {
    await this.repository.setChunkSuccess(chunkId, eTag);
    this.logger.info(`Successfully reported chunk ${chunkId}.`);
  }

  private async handleChunkFailure(
    sessionId: string,
    failureInfo: { status?: number; message?: string }
  ): Promise<void> {
    const updatedSession = await this.repository.incrementSessionErrorsCount(sessionId, {
      totalFailureCount: true,
    });

    this.logger.warn(
      `Failure reported for session ${sessionId}. Status: ${failureInfo.status}. Total failures: ${updatedSession.totalFailureCount}`
    );

    if (updatedSession.totalFailureCount >= this.maxSessionFailures) {
      const reason = `Exceeded max failures. Last error: ${failureInfo.status} - ${failureInfo.message || 'No message'}`;
      await this.failUploadSession(sessionId, reason);
    }
  }

  private async failUploadSession(sessionId: string, reason: string): Promise<void> {
    this.logger.error(`Session ${sessionId} is being marked as FAILED. Reason: ${reason}`);

    const updated = await this.repository.failActiveSession(sessionId, reason);
    if (updated) {
      const sessionToAbort = await this.repository.tryFindUploadSession(sessionId, {
        storageUploadId: true,
        file: { select: { storageKey: true } },
      });

      if (sessionToAbort?.file) {
        await this.s3.abortMultipartUpload(
          sessionToAbort.file.storageKey,
          notNull(sessionToAbort.storageUploadId)
        );
        this.logger.info(`Aborted S3 upload for failed session ${sessionId}.`);
      }
    }
  }

  private async makeGuideResponse(sessionId: string, limit: number): Promise<GuideResponseDto> {
    const chunksToUpload = await this.getNextAvailableChunks(sessionId, limit);

    if (chunksToUpload.length > 0) {
      return {
        type: 'upload',
        uploads: chunksToUpload.map(chunk => ({
          partNumber: chunk.partNumber,
          chunkId: chunk.chunkId,
        })),
      };
    }

    const session = await this.repository.tryFindUploadSession(sessionId, { id: true, fileId: true });
    if (!session) {
      throw new NotFoundException(`Session ${sessionId} disappeared unexpectedly.`);
    }

    const didUpdated = await this.repository.setUploadSessionFinalizing(sessionId);

    if (didUpdated) {
      this.logger.info(`Session ${sessionId} claimed for finalization.`);
      try {
        const finalFile = await this.finalizeUpload(sessionId);
        return {
          type: 'file',
          file: { id: finalFile.id, cdnUrl: finalFile.cdnUrl },
        };
      } catch (error) {
        this.logger.error({ error }, `Finalization process failed for session ${sessionId}`);
        return { type: 'failed', error: 'File finalization failed during processing.' };
      }
    }

    this.logger.info(`Finalization for session ${sessionId} in progress by another process. Waiting...`);
    const finalResult = await this.waitForFinalization(sessionId, session.fileId);

    if (finalResult.status === 'COMPLETED') {
      return { type: 'file', file: finalResult.file };
    } else {
      return { type: 'failed', error: finalResult.error };
    }
  }

  private async createNewUploadSession(
    input: Omit<InitiateUploadInput, 'parallel'>,
    userId: string
  ): Promise<Pick<UploadSession, `id`>> {
    const { sizeBytes, totalChunks } = input;

    if (totalChunks < 1) {
      throw new BadRequestException('totalChunks must be at least 1.');
    }

    const chunkSize = Math.ceil(Number(sizeBytes / BigInt(totalChunks)));
    if (chunkSize > this.maxChunkSizeBytes) {
      throw new BadRequestException(
        `totalChunks is too low. For a file of this size, please use at least ${sizeBytes / this.maxChunkSizeBytes}`
      );
    }
    if (chunkSize < this.minChunkSizeBytes) {
      throw new BadRequestException(
        `totalChunks is too high. For a file of this size, please use at least ${sizeBytes / this.minChunkSizeBytes}`
      );
    }

    const session = await this.db.inOwnTransaction(async () => {
      const newFile = await this.repository.createStoredFile(input, userId, { id: true });

      return this.repository.createUploadSession(newFile.id, totalChunks, {
        id: true,
        file: { select: { id: true, storageKey: true } },
      });
    });

    const storageUploadId = await this.s3.createMultipartUpload(session.file.storageKey, input.mimeType);

    await this.repository.activateUploadSession(session.id, storageUploadId);

    return session;
  }

  private async getNextAvailableChunks(
    sessionId: string,
    limit: number
  ): Promise<{ partNumber: number; chunkId: string }[]> {
    return this.db.inAnyTransaction(async () => {
      const chunks = await this.repository.findAvailableChunksOfSession(sessionId, limit, {
        id: true,
        partNumber: true,
      });

      if (chunks.length > 0) {
        const chunkIds = chunks.map(c => c.id);
        await this.repository.uploadChunkHasLeased(chunkIds);
      }

      return chunks.map(c => ({
        partNumber: c.partNumber,
        chunkId: c.id,
      }));
    });
  }

  private async waitForFinalization(
    sessionId: string,
    fileId: string
  ): Promise<
    { status: 'COMPLETED'; file: { id: string; cdnUrl: string } } | { status: 'FAILED'; error: string }
  > {
    const startTime = Date.now();
    while (Date.now() - startTime < this.finalizationTimeoutMs) {
      const session = await this.repository.tryFindUploadSession(sessionId, {
        status: true,
        failReason: true,
      });

      if (!session) {
        const finalFile = await this.repository.tryFindStoredFileById(fileId, { id: true, cdnUrl: true });
        if (!finalFile) {
          throw new InternalServerErrorException('Finalized file could not be found.');
        }
        return { status: 'COMPLETED' as const, file: { id: finalFile.id, cdnUrl: finalFile.cdnUrl } };
      }

      if (session.status === 'FAILED') {
        return {
          status: 'FAILED' as const,
          error: session.failReason || 'File verification failed after upload.',
        };
      }

      await sleep(this.pollingIntervalMs);
    }
    throw new InternalServerErrorException('File finalization timed out.');
  }

  private async finalizeUpload(sessionId: string): Promise<StoredFile> {
    const session = await this.repository.tryFindUploadSession(sessionId, {
      fileId: true,
      storageUploadId: true,
      chunks: { orderBy: { partNumber: 'asc' } },
      file: { select: { id: true, checksum: true } },
    });

    if (!session?.file) {
      throw new Error(`Session ${sessionId} not found for finalization.`);
    }

    try {
      const parts = session.chunks.map(c => {
        if (!c.eTag) {
          throw new Error(`Cannot finalize upload ${sessionId}: chunk ${c.partNumber} is missing its ETag.`);
        }
        return { PartNumber: c.partNumber, ETag: c.eTag };
      });
      const finalS3File = await this.s3.completeMultipartUpload(
        session.file.id, // Using file.id as storageKey
        session.storageUploadId!,
        parts,
        session.file.checksum
      );
      const finalUrl = finalS3File.Location || `https://your-cdn.com/${session.file.id}`;

      const updatedFile = await this.repository.setFinalUrlOfStoredFile(session.fileId, finalUrl, {
        id: true,
        createdAt: true,
        checksum: true,
        sizeBytes: true,
        originalFilename: true,
        mimeType: true,
        storageKey: true,
        cdnUrl: true,
        metadata: true,
        uploadedByUserId: true,
        updatedAt: true,
      });

      await this.repository.deleteUploadSession(sessionId);
      this.logger.info(`Successfully finalized and cleaned up session ${sessionId}`);
      return updatedFile;
    } catch (error) {
      this.logger.error({ error }, `S3 completion/verification failed for session ${sessionId}`);
      await this.repository.failSession(sessionId, 'Final S3 completion or verification failed.');

      await this.s3.abortMultipartUpload(
        session.file.id, // Using file.id as storageKey
        session.storageUploadId!
      );
      throw error;
    }
  }
}
