import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagUpdateWithoutMenuInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  })
  .strict();

export const TagUpdateWithoutMenuInputObjectSchema = Schema;
