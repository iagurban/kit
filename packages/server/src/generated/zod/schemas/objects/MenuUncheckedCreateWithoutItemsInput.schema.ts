import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TagUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './TagUncheckedCreateNestedManyWithoutMenuInput.schema';
import { UploadedFileUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './UploadedFileUncheckedCreateNestedManyWithoutMenuInput.schema';

const Schema: z.ZodType<Prisma.MenuUncheckedCreateWithoutItemsInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    title: z.string(),
    ownerId: z.string(),
    tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
  })
  .strict();

export const MenuUncheckedCreateWithoutItemsInputObjectSchema = Schema;
