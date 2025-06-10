import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MenuUpdateManyWithoutOwnerNestedInputObjectSchema } from './MenuUpdateManyWithoutOwnerNestedInput.schema';
import { RefreshTokenUpdateManyWithoutUserNestedInputObjectSchema } from './RefreshTokenUpdateManyWithoutUserNestedInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserUpdateWithoutUploadedFilesInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    createdAt: z
      .union([z.coerce.dateStr(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    passwordHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    menus: z.lazy(() => MenuUpdateManyWithoutOwnerNestedInputObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  })
  .strict();

export const UserUpdateWithoutUploadedFilesInputObjectSchema = Schema;
