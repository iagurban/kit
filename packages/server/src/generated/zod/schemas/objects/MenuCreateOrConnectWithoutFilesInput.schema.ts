import { z } from 'zod';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';
import { MenuCreateWithoutFilesInputObjectSchema } from './MenuCreateWithoutFilesInput.schema';
import { MenuUncheckedCreateWithoutFilesInputObjectSchema } from './MenuUncheckedCreateWithoutFilesInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCreateOrConnectWithoutFilesInput> = z
  .object({
    where: z.lazy(() => MenuWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MenuCreateWithoutFilesInputObjectSchema),
      z.lazy(() => MenuUncheckedCreateWithoutFilesInputObjectSchema),
    ]),
  })
  .strict();

export const MenuCreateOrConnectWithoutFilesInputObjectSchema = Schema;
