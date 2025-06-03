import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './ItemUncheckedCreateNestedManyWithoutMenuInput.schema';
import { TagUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './TagUncheckedCreateNestedManyWithoutMenuInput.schema';

const Schema: z.ZodType<Prisma.MenuUncheckedCreateWithoutFilesInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    title: z.string(),
    ownerId: z.string(),
    items: z.lazy(() => ItemUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
  })
  .strict();

export const MenuUncheckedCreateWithoutFilesInputObjectSchema = Schema;
