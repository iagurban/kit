import { createHash } from 'node:crypto';
import fs from 'node:fs';
import * as path from 'node:path';

import { Injectable } from '@nestjs/common';

import { StoredFile, UploadedFile } from '../../generated/db-client';
import { currentUserCtx } from '../../interceptors/current-user-context';
import { DbService } from '../db/db.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class FilesService {
  constructor(
    readonly db: DbService,
    readonly users: UsersService
  ) {}

  async saveNewFile(file: Express.Multer.File, hash: string): Promise<StoredFile> {
    // Создаём запись в БД
    const storedFile = await this.db.client.storedFile.create({ data: { hash, size: file.size } });

    try {
      const fullPath = this.fullStoredPath(storedFile);

      // Сохраняем файл на диск
      await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.promises.writeFile(fullPath, file.buffer);
    } catch (error) {
      await this.db.client.storedFile.delete({ where: { id: storedFile.id } });
      throw error;
    }

    return storedFile;
  }

  private fullStoredPath(storedFile: StoredFile) {
    return path.join(process.cwd(), 'storage', this.generateStoragePath(storedFile.id));
  }

  private generateStoragePath(id: string): string {
    return id.replace(/-/g, '/');
  }

  async findExistingFileByData(file: Express.Multer.File, hash: string): Promise<StoredFile | null> {
    // 1. Find candidates by hash AND size
    const candidates = await this.db.client.storedFile.findMany({ where: { hash, size: file.size } });
    if (candidates.length === 0) {
      return null;
    }

    // 2. Byte-by-byte contents comparison
    for (const candidate of candidates) {
      const fullPath = this.fullStoredPath(candidate);

      try {
        const storedBuffer = await fs.promises.readFile(fullPath);

        if (Buffer.compare(file.buffer, storedBuffer) === 0) {
          return candidate;
        }
      } catch (error) {
        console.error(`Failed to read stored file: ${fullPath}`, error);
      }
    }

    return null;
  }

  private calculateHash(buffer: Buffer): string {
    return createHash('md5').update(buffer).digest('hex');
  }

  async upload(file: Express.Multer.File, menuId: string): Promise<UploadedFile> {
    const hash = this.calculateHash(file.buffer);
    const storedFile =
      (await this.findExistingFileByData(file, hash)) || (await this.saveNewFile(file, hash));

    /// TODO check if user has access to menu of menuId

    return this.db.client.uploadedFile.create({
      data: {
        originalName: file.originalname,
        storedFile: { connect: { id: storedFile.id } },
        mimetype: file.mimetype,
        uploader: { connect: { id: currentUserCtx.get().id } },
        // menu: { connect: { id: menuId } },
      },
    });
  }

  async removeOrphanedFiles(maxAgeMs: number): Promise<void> {
    const cutoffDate = new Date(Date.now() - maxAgeMs);

    // Найти все 'storedFile' без связанных uploads и старше заданной даты
    const orphanedFiles = await this.db.client.storedFile.findMany({
      where: {
        createdAt: { lt: cutoffDate },
        uploads: { none: {} },
      },
    });

    for (const file of orphanedFiles) {
      const fullPath = this.fullStoredPath(file);

      try {
        await fs.promises.unlink(fullPath);
        console.log(`Deleted file from storage: ${fullPath}`);
      } catch (error) {
        console.error(`Failed to delete file: ${fullPath}`, error);
        // можешь добавить логику игнорирования отсутствующих файлов
      }

      try {
        await this.db.client.storedFile.delete({
          where: { id: file.id },
        });
        console.log(`Deleted StoredFile record: ${file.id}`);
      } catch (error) {
        console.error(`Failed to delete StoredFile record: ${file.id}`, error);
      }
    }
  }

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  // async cleanUp() {
  //   const oneDayMs = 24 * 60 * 60 * 1000;
  //   await this.removeOrphanedFiles(oneDayMs);
  // }
}
