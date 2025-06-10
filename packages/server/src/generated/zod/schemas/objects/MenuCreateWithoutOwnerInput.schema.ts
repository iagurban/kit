import { z } from 'zod';
import { ItemCreateNestedManyWithoutMenuInputObjectSchema } from './ItemCreateNestedManyWithoutMenuInput.schema';
import { TagCreateNestedManyWithoutMenuInputObjectSchema } from './TagCreateNestedManyWithoutMenuInput.schema';
import { UploadedFileCreateNestedManyWithoutMenuInputObjectSchema } from './UploadedFileCreateNestedManyWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCreateWithoutOwnerInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    title: z.string(),
    items: z.lazy(() => ItemCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    tags: z.lazy(() => TagCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileCreateNestedManyWithoutMenuInputObjectSchema).optional(),
  })
  .strict();

export const MenuCreateWithoutOwnerInputObjectSchema = Schema;
