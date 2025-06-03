import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ItemUpdateManyWithoutMenuNestedInputObjectSchema } from './ItemUpdateManyWithoutMenuNestedInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { TagUpdateManyWithoutMenuNestedInputObjectSchema } from './TagUpdateManyWithoutMenuNestedInput.schema';
import { UploadedFileUpdateManyWithoutMenuNestedInputObjectSchema } from './UploadedFileUpdateManyWithoutMenuNestedInput.schema';

const Schema: z.ZodType<Prisma.MenuUpdateWithoutOwnerInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    createdAt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    items: z.lazy(() => ItemUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
    tags: z.lazy(() => TagUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
  })
  .strict();

export const MenuUpdateWithoutOwnerInputObjectSchema = Schema;
