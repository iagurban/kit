import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInputObjectSchema } from './UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInput.schema';

const Schema: z.ZodType<Prisma.StoredFileUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    hash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    size: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
    createdAt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    uploads: z.lazy(() => UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInputObjectSchema).optional(),
  })
  .strict();

export const StoredFileUncheckedUpdateInputObjectSchema = Schema;
