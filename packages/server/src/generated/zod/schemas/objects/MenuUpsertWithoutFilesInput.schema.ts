import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCreateWithoutFilesInputObjectSchema } from './MenuCreateWithoutFilesInput.schema';
import { MenuUncheckedCreateWithoutFilesInputObjectSchema } from './MenuUncheckedCreateWithoutFilesInput.schema';
import { MenuUncheckedUpdateWithoutFilesInputObjectSchema } from './MenuUncheckedUpdateWithoutFilesInput.schema';
import { MenuUpdateWithoutFilesInputObjectSchema } from './MenuUpdateWithoutFilesInput.schema';

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
