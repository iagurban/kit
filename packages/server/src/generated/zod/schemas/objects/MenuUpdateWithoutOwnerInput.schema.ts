import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ItemUpdateManyWithoutMenuNestedInputObjectSchema } from './ItemUpdateManyWithoutMenuNestedInput.schema';
import { TagUpdateManyWithoutMenuNestedInputObjectSchema } from './TagUpdateManyWithoutMenuNestedInput.schema';
import { UploadedFileUpdateManyWithoutMenuNestedInputObjectSchema } from './UploadedFileUpdateManyWithoutMenuNestedInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuUpdateWithoutOwnerInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    createdAt: z
      .union([z.coerce.dateStr(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    items: z.lazy(() => ItemUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
    tags: z.lazy(() => TagUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
  })
  .strict();

export const MenuUpdateWithoutOwnerInputObjectSchema = Schema;
