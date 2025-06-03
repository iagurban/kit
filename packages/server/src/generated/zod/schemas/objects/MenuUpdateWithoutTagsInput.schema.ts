import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ItemUpdateManyWithoutMenuNestedInputObjectSchema } from './ItemUpdateManyWithoutMenuNestedInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UploadedFileUpdateManyWithoutMenuNestedInputObjectSchema } from './UploadedFileUpdateManyWithoutMenuNestedInput.schema';
import { UserUpdateOneRequiredWithoutMenusNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutMenusNestedInput.schema';

const Schema: z.ZodType<Prisma.MenuUpdateWithoutTagsInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    createdAt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    owner: z.lazy(() => UserUpdateOneRequiredWithoutMenusNestedInputObjectSchema).optional(),
    items: z.lazy(() => ItemUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileUpdateManyWithoutMenuNestedInputObjectSchema).optional(),
  })
  .strict();

export const MenuUpdateWithoutTagsInputObjectSchema = Schema;
