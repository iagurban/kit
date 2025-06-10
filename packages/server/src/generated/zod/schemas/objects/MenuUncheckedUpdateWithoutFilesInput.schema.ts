import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ItemUncheckedUpdateManyWithoutMenuNestedInputObjectSchema } from './ItemUncheckedUpdateManyWithoutMenuNestedInput.schema';
import { TagUncheckedUpdateManyWithoutMenuNestedInputObjectSchema } from './TagUncheckedUpdateManyWithoutMenuNestedInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuUncheckedUpdateWithoutFilesInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    createdAt: z
      .union([z.coerce.dateStr(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    ownerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    items: z.lazy(() => ItemUncheckedUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
    tags: z.lazy(() => TagUncheckedUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
  })
  .strict();

export const MenuUncheckedUpdateWithoutFilesInputObjectSchema = Schema;
