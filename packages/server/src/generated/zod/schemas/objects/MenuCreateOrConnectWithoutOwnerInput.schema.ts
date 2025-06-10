import { z } from 'zod';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';
import { MenuCreateWithoutOwnerInputObjectSchema } from './MenuCreateWithoutOwnerInput.schema';
import { MenuUncheckedCreateWithoutOwnerInputObjectSchema } from './MenuUncheckedCreateWithoutOwnerInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCreateOrConnectWithoutOwnerInput> = z
  .object({
    where: z.lazy(() => MenuWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MenuCreateWithoutOwnerInputObjectSchema),
      z.lazy(() => MenuUncheckedCreateWithoutOwnerInputObjectSchema),
    ]),
  })
  .strict();

export const MenuCreateOrConnectWithoutOwnerInputObjectSchema = Schema;
