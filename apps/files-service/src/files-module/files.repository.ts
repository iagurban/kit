import { Injectable } from '@nestjs/common';
import { Prisma } from '@poslah/database/generated/db-client/client';
import { DbService } from '@poslah/util/modules/db-module/db.service';

import { UploadSessionSelectPayload } from './files.service';

export type StoredFileSelectPayload<S extends Prisma.StoredFileSelect> = Prisma.StoredFileGetPayload<{
  select: S;
}>;
export type UploadChunkSelectPayload<S extends Prisma.UploadChunkSelect> = Prisma.UploadChunkGetPayload<{
  select: S;
}>;

@Injectable()
export class FilesRepository {
  constructor(private readonly db: DbService) {}

  async tryFindStoredFile<S extends Prisma.StoredFileSelect>(
    checksum: string,
    sizeBytes: bigint,
    select?: S
  ): Promise<StoredFileSelectPayload<S> | null> {
    return this.db.client.storedFile.findUnique({
      where: { checksum_sizeBytes: { checksum, sizeBytes } },
      select,
    }) as Promise<StoredFileSelectPayload<S> | null>;
  }

  async tryFindStoredFileById<S extends Prisma.StoredFileSelect>(
    fileId: string,
    select?: S
  ): Promise<StoredFileSelectPayload<S> | null> {
    return this.db.client.storedFile.findUnique({
      where: { id: fileId },
      select,
    }) as Promise<StoredFileSelectPayload<S> | null>;
  }

  async tryFindUploadChunk<S extends Prisma.UploadChunkSelect>(
    chunkId: string,
    select?: S
  ): Promise<UploadChunkSelectPayload<S> | null> {
    return this.db.transaction.uploadChunk.findUnique({
      where: { id: chunkId },
      select,
    }) as Promise<UploadChunkSelectPayload<S> | null>;
  }

  async incrementSessionErrorsCount<S extends Prisma.UploadSessionSelect>(
    sessionId: string,
    select?: S
  ): Promise<UploadSessionSelectPayload<S>> {
    return this.db.transaction.uploadSession.update({
      where: { id: sessionId },
      data: { totalFailureCount: { increment: 1 } },
      select,
    }) as Promise<UploadSessionSelectPayload<S>>;
  }

  async failActiveSession(sessionId: string, reason: string): Promise<boolean> {
    return (
      (
        await this.db.client.uploadSession.updateMany({
          where: { id: sessionId, status: 'ACTIVE' },
          data: { status: 'FAILED', failReason: reason },
        })
      ).count > 0
    );
  }

  async failSession(sessionId: string, reason: string): Promise<boolean> {
    return (
      (
        await this.db.client.uploadSession.updateMany({
          where: { id: sessionId },
          data: { status: 'FAILED', failReason: reason },
        })
      ).count > 0
    );
  }

  async uploadChunkHasLeased(chunkId: string | readonly string[]): Promise<void> {
    const ids = typeof chunkId === 'string' ? [chunkId] : chunkId;
    if (ids.length > 1) {
      await this.db.transaction.uploadChunk.updateMany({
        where: { id: { in: [...ids] } },
        data: { leasedAt: new Date() },
      });
    } else if (ids.length === 1) {
      await this.db.transaction.uploadChunk.updateMany({
        where: { id: ids[0] },
        data: { leasedAt: new Date() },
      });
    }
  }

  tryFindUploadSession<S extends Prisma.UploadSessionSelect>(
    sessionId: string,
    select?: S
  ): Promise<UploadSessionSelectPayload<S> | null> {
    return this.db.client.uploadSession.findUnique({
      where: { id: sessionId },
      select,
    }) as Promise<UploadSessionSelectPayload<S> | null>;
  }

  async setChunkSuccess(chunkId: string, eTag: string) {
    await this.db.transaction.uploadChunk.update({
      where: { id: chunkId },
      data: { eTag },
    });
  }

  async createStoredFile<S extends Prisma.StoredFileSelect>(
    input: {
      checksum: string;
      sizeBytes: bigint;
      originalFilename: string;
      mimeType: string;
    },
    userId: string,
    select?: S
  ) {
    const file = await this.db.transaction.storedFile.create({
      data: {
        checksum: input.checksum,
        sizeBytes: input.sizeBytes,
        originalFilename: input.originalFilename,
        mimeType: input.mimeType,
        uploadedByUserId: userId,
        cdnUrl: 'TBD',
        storageKey: `TBD`,
      },
      select: { ...select, id: true },
    });

    await this.db.transaction.storedFile.update({
      where: { checksum_sizeBytes: { checksum: input.checksum, sizeBytes: input.sizeBytes } },
      data: { storageKey: file.id },
    });
    file.storageKey = file.id;

    return file as StoredFileSelectPayload<S>;
  }

  createUploadSession<S extends Prisma.UploadSessionSelect>(fileId: string, totalChunks: number, select?: S) {
    return this.db.transaction.uploadSession.create({
      data: {
        storageUploadId: `TBD`,
        totalChunks,
        fileId,
        status: 'ACTIVE',
        chunks: {
          createMany: {
            data: Array.from({ length: totalChunks }, (_, i) => ({ partNumber: i + 1 })),
          },
        },
      },
      select,
    }) as Promise<UploadSessionSelectPayload<S>>;
  }

  async setUploadSessionFinalizing(sessionId: string) {
    return (
      (
        await this.db.client.uploadSession.updateMany({
          where: { id: sessionId, status: 'ACTIVE' },
          data: { status: 'FINALIZING' },
        })
      ).count > 0
    );
  }

  async activateUploadSession(sessionId: string, storageUploadId: string) {
    await this.db.transaction.uploadSession.update({
      where: { id: sessionId },
      data: { storageUploadId, status: 'ACTIVE' },
    });
  }

  findAvailableChunksOfSession<S extends Prisma.UploadChunkSelect>(
    sessionId: string,
    limit: number,
    select?: S
  ) {
    return this.db.transaction.uploadChunk.findMany({
      where: { sessionId, eTag: null },
      orderBy: { leasedAt: { sort: 'asc', nulls: 'first' } },
      take: limit,
      select,
    }) as Promise<UploadChunkSelectPayload<S>[]>;
  }

  setFinalUrlOfStoredFile<S extends Prisma.StoredFileSelect>(fileId: string, cdnUrl: string, select?: S) {
    return this.db.client.storedFile.update({
      where: { id: fileId },
      data: { cdnUrl },
      select,
    }) as Promise<StoredFileSelectPayload<S>>;
  }

  async deleteUploadSession(sessionId: string) {
    await this.db.client.uploadSession.delete({ where: { id: sessionId } });
  }
}
