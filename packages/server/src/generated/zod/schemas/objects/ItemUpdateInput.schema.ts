import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ItemUpdateManyWithoutParentNestedInputObjectSchema } from './ItemUpdateManyWithoutParentNestedInput.schema';
import { ItemUpdateOneWithoutChildrenNestedInputObjectSchema } from './ItemUpdateOneWithoutChildrenNestedInput.schema';
import { MenuUpdateOneRequiredWithoutItemsNestedInputObjectSchema } from './MenuUpdateOneRequiredWithoutItemsNestedInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UploadedFileUpdateOneWithoutUsingItemsNestedInputObjectSchema } from './UploadedFileUpdateOneWithoutUsingItemsNestedInput.schema';

const Schema: z.ZodType<Prisma.ItemUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    createdAt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    orderKey: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    title: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    price: z
      .union([z.number(), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    archived: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
    image: z.lazy(() => UploadedFileUpdateOneWithoutUsingItemsNestedInputObjectSchema).optional(),
    menu: z.lazy(() => MenuUpdateOneRequiredWithoutItemsNestedInputObjectSchema).optional(),
    parent: z.lazy(() => ItemUpdateOneWithoutChildrenNestedInputObjectSchema).optional(),
    children: z.lazy(() => ItemUpdateManyWithoutParentNestedInputObjectSchema).optional(),
  })
  .strict();

export const ItemUpdateInputObjectSchema = Schema;
