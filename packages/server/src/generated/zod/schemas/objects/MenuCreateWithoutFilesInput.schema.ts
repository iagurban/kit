import { z } from 'zod';
import { UserCreateNestedOneWithoutMenusInputObjectSchema } from './UserCreateNestedOneWithoutMenusInput.schema';
import { ItemCreateNestedManyWithoutMenuInputObjectSchema } from './ItemCreateNestedManyWithoutMenuInput.schema';
import { TagCreateNestedManyWithoutMenuInputObjectSchema } from './TagCreateNestedManyWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCreateWithoutFilesInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    title: z.string(),
    owner: z.lazy(() => UserCreateNestedOneWithoutMenusInputObjectSchema),
    items: z.lazy(() => ItemCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    tags: z.lazy(() => TagCreateNestedManyWithoutMenuInputObjectSchema).optional(),
  })
  .strict();

export const MenuCreateWithoutFilesInputObjectSchema = Schema;
