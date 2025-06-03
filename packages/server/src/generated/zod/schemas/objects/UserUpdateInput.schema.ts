import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MenuUpdateManyWithoutOwnerNestedInputObjectSchema } from './MenuUpdateManyWithoutOwnerNestedInput.schema';
import { RefreshTokenUpdateManyWithoutUserNestedInputObjectSchema } from './RefreshTokenUpdateManyWithoutUserNestedInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UploadedFileUpdateManyWithoutUploaderNestedInputObjectSchema } from './UploadedFileUpdateManyWithoutUploaderNestedInput.schema';

const Schema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    createdAt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    passwordHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    menus: z.lazy(() => MenuUpdateManyWithoutOwnerNestedInputObjectSchema).optional(),
    uploadedFiles: z.lazy(() => UploadedFileUpdateManyWithoutUploaderNestedInputObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  })
  .strict();

export const UserUpdateInputObjectSchema = Schema;
