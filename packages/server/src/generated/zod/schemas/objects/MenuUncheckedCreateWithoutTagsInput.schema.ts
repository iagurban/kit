import { z } from 'zod';
import { ItemUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './ItemUncheckedCreateNestedManyWithoutMenuInput.schema';
import { UploadedFileUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './UploadedFileUncheckedCreateNestedManyWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuUncheckedCreateWithoutTagsInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    title: z.string(),
    ownerId: z.string(),
    items: z.lazy(() => ItemUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
  })
  .strict();

export const MenuUncheckedCreateWithoutTagsInputObjectSchema = Schema;
