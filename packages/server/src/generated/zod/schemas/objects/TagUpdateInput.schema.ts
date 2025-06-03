import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuUpdateOneRequiredWithoutTagsNestedInputObjectSchema } from './MenuUpdateOneRequiredWithoutTagsNestedInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';

const Schema: z.ZodType<Prisma.TagUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    menu: z.lazy(() => MenuUpdateOneRequiredWithoutTagsNestedInputObjectSchema).optional(),
  })
  .strict();

export const TagUpdateInputObjectSchema = Schema;
