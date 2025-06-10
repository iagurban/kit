import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { MenuUpdateOneRequiredWithoutItemsNestedInputObjectSchema } from './MenuUpdateOneRequiredWithoutItemsNestedInput.schema';
import { ItemUpdateOneWithoutChildrenNestedInputObjectSchema } from './ItemUpdateOneWithoutChildrenNestedInput.schema';
import { ItemUpdateManyWithoutParentNestedInputObjectSchema } from './ItemUpdateManyWithoutParentNestedInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemUpdateWithoutImageInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    createdAt: z
      .union([z.coerce.dateStr(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
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
    menu: z.lazy(() => MenuUpdateOneRequiredWithoutItemsNestedInputObjectSchema).optional(),
    parent: z.lazy(() => ItemUpdateOneWithoutChildrenNestedInputObjectSchema).optional(),
    children: z.lazy(() => ItemUpdateManyWithoutParentNestedInputObjectSchema).optional(),
  })
  .strict();

export const ItemUpdateWithoutImageInputObjectSchema = Schema;
