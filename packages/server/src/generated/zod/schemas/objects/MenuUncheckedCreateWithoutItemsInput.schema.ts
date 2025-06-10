import { z } from 'zod';
import { TagUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './TagUncheckedCreateNestedManyWithoutMenuInput.schema';
import { UploadedFileUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './UploadedFileUncheckedCreateNestedManyWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuUncheckedCreateWithoutItemsInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    title: z.string(),
    ownerId: z.string(),
    tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
  })
  .strict();

export const MenuUncheckedCreateWithoutItemsInputObjectSchema = Schema;
