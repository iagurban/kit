import { z } from 'zod';
import { ItemUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './ItemUncheckedCreateNestedManyWithoutMenuInput.schema';
import { TagUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './TagUncheckedCreateNestedManyWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuUncheckedCreateWithoutFilesInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    title: z.string(),
    ownerId: z.string(),
    items: z.lazy(() => ItemUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
  })
  .strict();

export const MenuUncheckedCreateWithoutFilesInputObjectSchema = Schema;
