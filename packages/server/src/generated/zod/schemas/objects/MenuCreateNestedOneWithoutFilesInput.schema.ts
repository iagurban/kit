import { z } from 'zod';
import { MenuCreateWithoutFilesInputObjectSchema } from './MenuCreateWithoutFilesInput.schema';
import { MenuUncheckedCreateWithoutFilesInputObjectSchema } from './MenuUncheckedCreateWithoutFilesInput.schema';
import { MenuCreateOrConnectWithoutFilesInputObjectSchema } from './MenuCreateOrConnectWithoutFilesInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCreateNestedOneWithoutFilesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => MenuCreateWithoutFilesInputObjectSchema),
        z.lazy(() => MenuUncheckedCreateWithoutFilesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => MenuCreateOrConnectWithoutFilesInputObjectSchema).optional(),
    connect: z.lazy(() => MenuWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const MenuCreateNestedOneWithoutFilesInputObjectSchema = Schema;
