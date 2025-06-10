import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ItemUncheckedUpdateManyWithoutMenuNestedInputObjectSchema } from './ItemUncheckedUpdateManyWithoutMenuNestedInput.schema';
import { TagUncheckedUpdateManyWithoutMenuNestedInputObjectSchema } from './TagUncheckedUpdateManyWithoutMenuNestedInput.schema';
import { UploadedFileUncheckedUpdateManyWithoutMenuNestedInputObjectSchema } from './UploadedFileUncheckedUpdateManyWithoutMenuNestedInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuUncheckedUpdateWithoutOwnerInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    createdAt: z
      .union([z.coerce.dateStr(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    items: z.lazy(() => ItemUncheckedUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
    tags: z.lazy(() => TagUncheckedUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileUncheckedUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
  })
  .strict();

export const MenuUncheckedUpdateWithoutOwnerInputObjectSchema = Schema;
