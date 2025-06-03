import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCreateWithoutOwnerInputObjectSchema } from './MenuCreateWithoutOwnerInput.schema';
import { MenuUncheckedCreateWithoutOwnerInputObjectSchema } from './MenuUncheckedCreateWithoutOwnerInput.schema';
import { MenuUncheckedUpdateWithoutOwnerInputObjectSchema } from './MenuUncheckedUpdateWithoutOwnerInput.schema';
import { MenuUpdateWithoutOwnerInputObjectSchema } from './MenuUpdateWithoutOwnerInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.MenuUpsertWithWhereUniqueWithoutOwnerInput> = z
  .object({
    where: z.lazy(() => MenuWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => MenuUpdateWithoutOwnerInputObjectSchema),
      z.lazy(() => MenuUncheckedUpdateWithoutOwnerInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => MenuCreateWithoutOwnerInputObjectSchema),
      z.lazy(() => MenuUncheckedCreateWithoutOwnerInputObjectSchema),
    ]),
  })
  .strict();

export const MenuUpsertWithWhereUniqueWithoutOwnerInputObjectSchema = Schema;
