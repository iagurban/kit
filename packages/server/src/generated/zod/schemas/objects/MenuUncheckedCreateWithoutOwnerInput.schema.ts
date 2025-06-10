import { z } from 'zod';
import { ItemUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './ItemUncheckedCreateNestedManyWithoutMenuInput.schema';
import { TagUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './TagUncheckedCreateNestedManyWithoutMenuInput.schema';
import { UploadedFileUncheckedCreateNestedManyWithoutMenuInputObjectSchema } from './UploadedFileUncheckedCreateNestedManyWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuUncheckedCreateWithoutOwnerInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    title: z.string(),
    items: z.lazy(() => ItemUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileUncheckedCreateNestedManyWithoutMenuInputObjectSchema).optional(),
  })
  .strict();

export const MenuUncheckedCreateWithoutOwnerInputObjectSchema = Schema;
