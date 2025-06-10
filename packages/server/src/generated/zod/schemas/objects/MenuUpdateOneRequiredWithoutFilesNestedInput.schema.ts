import { z } from 'zod';
import { MenuCreateWithoutFilesInputObjectSchema } from './MenuCreateWithoutFilesInput.schema';
import { MenuUncheckedCreateWithoutFilesInputObjectSchema } from './MenuUncheckedCreateWithoutFilesInput.schema';
import { MenuCreateOrConnectWithoutFilesInputObjectSchema } from './MenuCreateOrConnectWithoutFilesInput.schema';
import { MenuUpsertWithoutFilesInputObjectSchema } from './MenuUpsertWithoutFilesInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';
import { MenuUpdateWithoutFilesInputObjectSchema } from './MenuUpdateWithoutFilesInput.schema';
import { MenuUncheckedUpdateWithoutFilesInputObjectSchema } from './MenuUncheckedUpdateWithoutFilesInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuUpdateOneRequiredWithoutFilesNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => MenuCreateWithoutFilesInputObjectSchema),
        z.lazy(() => MenuUncheckedCreateWithoutFilesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => MenuCreateOrConnectWithoutFilesInputObjectSchema).optional(),
    upsert: z.lazy(() => MenuUpsertWithoutFilesInputObjectSchema).optional(),
    connect: z.lazy(() => MenuWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => MenuUpdateWithoutFilesInputObjectSchema),
        z.lazy(() => MenuUncheckedUpdateWithoutFilesInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const MenuUpdateOneRequiredWithoutFilesNestedInputObjectSchema = Schema;
