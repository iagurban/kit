import { z } from 'zod';
import { UserCreateNestedOneWithoutMenusInputObjectSchema } from './UserCreateNestedOneWithoutMenusInput.schema';
import { TagCreateNestedManyWithoutMenuInputObjectSchema } from './TagCreateNestedManyWithoutMenuInput.schema';
import { UploadedFileCreateNestedManyWithoutMenuInputObjectSchema } from './UploadedFileCreateNestedManyWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCreateWithoutItemsInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    title: z.string(),
    owner: z.lazy(() => UserCreateNestedOneWithoutMenusInputObjectSchema),
    tags: z.lazy(() => TagCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileCreateNestedManyWithoutMenuInputObjectSchema).optional(),
  })
  .strict();

export const MenuCreateWithoutItemsInputObjectSchema = Schema;
