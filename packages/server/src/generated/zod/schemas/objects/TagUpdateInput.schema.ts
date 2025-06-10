import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { MenuUpdateOneRequiredWithoutTagsNestedInputObjectSchema } from './MenuUpdateOneRequiredWithoutTagsNestedInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    menu: z.lazy(() => MenuUpdateOneRequiredWithoutTagsNestedInputObjectSchema).optional(),
  })
  .strict();

export const TagUpdateInputObjectSchema = Schema;
