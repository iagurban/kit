import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateNestedManyWithoutMenuInputObjectSchema } from './ItemCreateNestedManyWithoutMenuInput.schema';
import { TagCreateNestedManyWithoutMenuInputObjectSchema } from './TagCreateNestedManyWithoutMenuInput.schema';
import { UploadedFileCreateNestedManyWithoutMenuInputObjectSchema } from './UploadedFileCreateNestedManyWithoutMenuInput.schema';
import { UserCreateNestedOneWithoutMenusInputObjectSchema } from './UserCreateNestedOneWithoutMenusInput.schema';

const Schema: z.ZodType<Prisma.MenuCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    title: z.string(),
    owner: z.lazy(() => UserCreateNestedOneWithoutMenusInputObjectSchema),
    items: z.lazy(() => ItemCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    tags: z.lazy(() => TagCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileCreateNestedManyWithoutMenuInputObjectSchema).optional(),
  })
  .strict();

export const MenuCreateInputObjectSchema = Schema;
