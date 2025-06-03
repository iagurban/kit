import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCreateOrConnectWithoutFilesInputObjectSchema } from './MenuCreateOrConnectWithoutFilesInput.schema';
import { MenuCreateWithoutFilesInputObjectSchema } from './MenuCreateWithoutFilesInput.schema';
import { MenuUncheckedCreateWithoutFilesInputObjectSchema } from './MenuUncheckedCreateWithoutFilesInput.schema';
import { MenuUncheckedUpdateWithoutFilesInputObjectSchema } from './MenuUncheckedUpdateWithoutFilesInput.schema';
import { MenuUpdateWithoutFilesInputObjectSchema } from './MenuUpdateWithoutFilesInput.schema';
import { MenuUpsertWithoutFilesInputObjectSchema } from './MenuUpsertWithoutFilesInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';

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
