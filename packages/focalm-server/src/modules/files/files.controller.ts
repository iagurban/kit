import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { z } from 'zod';

import { FilesService } from './files.service';

const menuSchema = z.object({
  menuId: z.string().min(1, 'MenuId cannot be empty'),
  // .regex(/^[a-zA-Z0-9-_]+$/, 'MenuId must contain only letters, numbers, hyphens and underscores'),
});

// type MenuInput = z.infer<typeof menuSchema>;

const mapAsync = async <T, U>(arr: T[], fn: (item: T) => Promise<U>) => {
  const results: U[] = [];
  for (const item of arr) {
    results.push(await fn(item));
  }
  return results;
};

@Controller('files')
export class FilesController {
  constructor(readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[], @Body() body: unknown) {
    const { menuId } = menuSchema.parse(body);
    return {
      files: (await mapAsync(files, file => this.filesService.upload(file, menuId))).map(file => ({
        id: file.id,
        url: file.storedFileId.replace(/-/g, '/'),
      })),
    };
  }
}
