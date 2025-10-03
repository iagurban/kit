import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { treeifyError, ZodError, ZodType } from 'zod/v4';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown, _metadata: ArgumentMetadata) {
    try {
      // Пытаемся распарсить и провалидировать данные
      return this.schema.parse(value);
    } catch (error) {
      // Если Zod выбросил ошибку, форматируем ее и отправляем клиенту
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: treeifyError(error).errors,
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
