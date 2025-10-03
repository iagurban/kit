import { once } from '@gurban/kit/core/once';
import { sleep } from '@gurban/kit/utils/async-utils';
import { notNull } from '@gurban/kit/utils/flow-utils';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '@poslah/database/db/db.service';
import { isPrismaClientError } from '@poslah/database/db/util';
import { StoredFile, UploadSession } from '@poslah/database/generated/db-client/client';
import { RedisService } from '@poslah/database/redis/redis.service';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { retrying } from '@poslah/util/retrying';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod/v4';

import { S3Service } from './s3.service';

// =======================================================================
// DTOs and Schemas (Your Provided Contract)
// =======================================================================

const joinPostArgsSchema = z.object({
  parallel: z.number().optional(),
});

const okReportArgsSchema = z.object({
  status: z.literal(200),
  eTag: z.string(),
});

export const reportArgsSchema = z.discriminatedUnion('status', [
  okReportArgsSchema,
  z.object({
    status: z.uint32().gte(400).lte(599),
    message: z.string().optional(),
  }),
]);
export type ReportArgs = z.infer<typeof reportArgsSchema>;

const isOKReportArgs = (r: ReportArgs): r is z.infer<typeof okReportArgsSchema> => r.status === 200;

export const guideResponseSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('upload'),
    uploads: z.array(
      z.object({
        partNumber: z.number().int(),
        getLink: z.string(),
      })
    ),
  }),
  z.object({
    type: z.literal('file'),
    file: z.object({
      id: z.string(),
      cdnUrl: z.string(),
    }),
  }),
  z.object({
    type: z.literal('failed'),
    error: z.string(),
  }),
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
  report: string;
}

@Injectable()
export class FilesService {
  private readonly reportTokenTTLSec = 3900;
  private readonly pollingIntervalMs = 200;
  private readonly finalizationTimeoutMs = 60000;
  private readonly maxSessionFailures = 20;

  constructor(
    private readonly loggerBase: Logger,
    private readonly db: DbService,
    private readonly s3: S3Service,
    private readonly redis: RedisService
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, FilesService.name);
  }

  async initiateOrJoinUpload(input: InitiateUploadInput, userId: string): Promise<GuideResponseDto> {
    const { checksum, sizeBytes, parallel = 4 } = input;

    return retrying(
      error => isPrismaClientError(error) && isPrismaClientError.uniqueConstraintFailed(error),
      async () => {
        const existingFile = await this.db.client.storedFile.findUnique({
          where: { checksum_sizeBytes: { checksum, sizeBytes } },
          select: { id: true, cdnUrl: true, uploadSession: { select: { id: true } } },
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

  async generateUrlForChunk(chunkId: string, args: GetLinkArgs): Promise<GetLinkResponseDto> {
    const { checksumSha256 } = args;
    return this.db.inOwnTransaction(async () => {
      const chunk = await this.db.transaction.uploadChunk.findUnique({
        where: { id: chunkId },
        include: { session: { include: { file: true } } },
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
      await this.redis.set(redisKey, redisValue, 'EX', this.reportTokenTTLSec);

      await this.db.transaction.uploadChunk.update({
        where: { id: chunkId },
        data: { leasedAt: new Date() },
      });

      return {
        upload: preSignedUrl,
        report: `/uploads/report/${reportToken}`,
      };
    });
  }

  async reportChunkOutcome(
    reportToken: string,
    body: ReportArgs,
    parallel: number = 4
  ): Promise<GuideResponseDto> {
    const redisKey = `upload:report-token:${reportToken}`;
    const tokenDataJson = await this.redis.getdel(redisKey);
    if (!tokenDataJson) {
      throw new ForbiddenException('Invalid or expired report token.');
    }

    const { sessionId, chunkId } = JSON.parse(tokenDataJson);

    if (isOKReportArgs(body)) {
      await this.handleChunkSuccess(chunkId, body.eTag);
    } else {
      await this.handleChunkFailure(sessionId, body);
    }

    return this.makeGuideResponse(sessionId, parallel);
  }

  // =======================================================================
  // PRIVATE HELPER METHODS
  // =======================================================================

  private async handleChunkSuccess(chunkId: string, eTag: string): Promise<void> {
    await this.db.client.uploadChunk.update({
      where: { id: chunkId },
      data: { eTag },
    });
    this.logger.info(`Successfully reported chunk ${chunkId}.`);
  }

  private async handleChunkFailure(
    sessionId: string,
    failureInfo: { status: number; message?: string }
  ): Promise<void> {
    const updatedSession = await this.db.client.uploadSession.update({
      where: { id: sessionId },
      data: { totalFailureCount: { increment: 1 } },
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

    const updateResult = await this.db.client.uploadSession.updateMany({
      where: { id: sessionId, status: 'ACTIVE' },
      data: {
        status: 'FAILED',
        failReason: reason,
      },
    });

    if (updateResult.count > 0) {
      const sessionToAbort = await this.db.client.uploadSession.findUnique({
        where: { id: sessionId },
        include: { file: true },
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
          getLink: `/uploads/urls/${chunk.chunkId}`,
        })),
      };
    }

    const session = await this.db.client.uploadSession.findUnique({ where: { id: sessionId } });
    if (!session) {
      throw new NotFoundException(`Session ${sessionId} disappeared unexpectedly.`);
    }

    const updateResult = await this.db.client.uploadSession.updateMany({
      where: { id: sessionId, status: 'ACTIVE' },
      data: { status: 'FINALIZING' },
    });

    if (updateResult.count > 0) {
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
    const session = await this.db.inOwnTransaction(async () => {
      const newFile = await this.db.transaction.storedFile.create({
        data: {
          checksum: input.checksum,
          sizeBytes: input.sizeBytes,
          originalFilename: input.originalFilename,
          mimeType: input.mimeType,
          uploadedByUserId: userId,
          cdnUrl: 'TBD',
          storageKey: `TBD`,
        },
      });

      await this.db.transaction.storedFile.update({
        where: { checksum_sizeBytes: { checksum: input.checksum, sizeBytes: input.sizeBytes } },
        data: { storageKey: newFile.id },
      });

      return this.db.transaction.uploadSession.create({
        data: {
          storageUploadId: `TBD`,
          totalChunks: input.totalChunks,
          fileId: newFile.id,
          status: 'ACTIVE',
          chunks: {
            createMany: {
              data: Array.from({ length: input.totalChunks }, (_, i) => ({ partNumber: i + 1 })),
            },
          },
        },
        select: { id: true, file: { select: { id: true, storageKey: true } } },
      });
    });

    const storageUploadId = await this.s3.createMultipartUpload(session.file.storageKey, input.mimeType);

    await this.db.transaction.uploadSession.update({
      where: { id: session.id },
      data: { storageUploadId, status: 'ACTIVE' },
    });

    return session;
  }

  private async getNextAvailableChunks(
    sessionId: string,
    limit: number
  ): Promise<{ partNumber: number; chunkId: string }[]> {
    return this.db.inAnyTransaction(async () => {
      const chunks = await this.db.transaction.uploadChunk.findMany({
        where: { sessionId, eTag: null },
        orderBy: { leasedAt: { sort: 'asc', nulls: 'first' } },
        take: limit,
      });

      if (chunks.length > 0) {
        const chunkIds = chunks.map(c => c.id);
        await this.db.transaction.uploadChunk.updateMany({
          where: { id: { in: chunkIds } },
          data: { leasedAt: new Date() },
        });
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
      const session = await this.db.client.uploadSession.findUnique({ where: { id: sessionId } });

      if (!session) {
        const finalFile = await this.db.client.storedFile.findUnique({ where: { id: fileId } });
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
    const session = await this.db.client.uploadSession.findUnique({
      where: { id: sessionId },
      include: { chunks: { orderBy: { partNumber: 'asc' } }, file: true },
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

      const updatedFile = await this.db.client.storedFile.update({
        where: { id: session.fileId },
        data: { cdnUrl: finalUrl },
      });

      await this.db.client.uploadSession.delete({ where: { id: sessionId } });
      this.logger.info(`Successfully finalized and cleaned up session ${sessionId}`);
      return updatedFile;
    } catch (error) {
      this.logger.error({ error }, `S3 completion/verification failed for session ${sessionId}`);
      await this.db.client.uploadSession.update({
        where: { id: sessionId },
        data: { status: 'FAILED', failReason: 'Final S3 completion or verification failed.' },
      });
      await this.s3.abortMultipartUpload(
        session.file.id, // Using file.id as storageKey
        session.storageUploadId!
      );
      throw error;
    }
  }
}
