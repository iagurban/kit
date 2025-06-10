import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MenuUncheckedUpdateManyWithoutOwnerNestedInputObjectSchema } from './MenuUncheckedUpdateManyWithoutOwnerNestedInput.schema';
import { RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './RefreshTokenUncheckedUpdateManyWithoutUserNestedInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUploadedFilesInput> = z
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
    menus: z.lazy(() => MenuUncheckedUpdateManyWithoutOwnerNestedInputObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  })
  .strict();

export const UserUncheckedUpdateWithoutUploadedFilesInputObjectSchema = Schema;
