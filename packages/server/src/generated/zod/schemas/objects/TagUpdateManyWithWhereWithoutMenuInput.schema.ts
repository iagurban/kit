import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TagScalarWhereInputObjectSchema } from './TagScalarWhereInput.schema';
import { TagUncheckedUpdateManyWithoutTagsInputObjectSchema } from './TagUncheckedUpdateManyWithoutTagsInput.schema';
import { TagUpdateManyMutationInputObjectSchema } from './TagUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutMenuInput> = z
  .object({
    where: z.lazy(() => TagScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => TagUpdateManyMutationInputObjectSchema),
      z.lazy(() => TagUncheckedUpdateManyWithoutTagsInputObjectSchema),
    ]),
  })
  .strict();

export const TagUpdateManyWithWhereWithoutMenuInputObjectSchema = Schema;
