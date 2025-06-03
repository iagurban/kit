import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateNestedManyWithoutMenuInputObjectSchema } from './ItemCreateNestedManyWithoutMenuInput.schema';
import { UploadedFileCreateNestedManyWithoutMenuInputObjectSchema } from './UploadedFileCreateNestedManyWithoutMenuInput.schema';
import { UserCreateNestedOneWithoutMenusInputObjectSchema } from './UserCreateNestedOneWithoutMenusInput.schema';

const Schema: z.ZodType<Prisma.MenuCreateWithoutTagsInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    title: z.string(),
    owner: z.lazy(() => UserCreateNestedOneWithoutMenusInputObjectSchema),
    items: z.lazy(() => ItemCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileCreateNestedManyWithoutMenuInputObjectSchema).optional(),
  })
  .strict();

export const MenuCreateWithoutTagsInputObjectSchema = Schema;
