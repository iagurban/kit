import { z } from 'zod';
import { MenuUpdateWithoutFilesInputObjectSchema } from './MenuUpdateWithoutFilesInput.schema';
import { MenuUncheckedUpdateWithoutFilesInputObjectSchema } from './MenuUncheckedUpdateWithoutFilesInput.schema';
import { MenuCreateWithoutFilesInputObjectSchema } from './MenuCreateWithoutFilesInput.schema';
import { MenuUncheckedCreateWithoutFilesInputObjectSchema } from './MenuUncheckedCreateWithoutFilesInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuUpsertWithoutFilesInput> = z
  .object({
    update: z.union([
      z.lazy(() => MenuUpdateWithoutFilesInputObjectSchema),
      z.lazy(() => MenuUncheckedUpdateWithoutFilesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => MenuCreateWithoutFilesInputObjectSchema),
      z.lazy(() => MenuUncheckedCreateWithoutFilesInputObjectSchema),
    ]),
  })
  .strict();

export const MenuUpsertWithoutFilesInputObjectSchema = Schema;
