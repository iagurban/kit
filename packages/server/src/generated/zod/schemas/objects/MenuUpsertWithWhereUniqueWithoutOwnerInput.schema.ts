import { z } from 'zod';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';
import { MenuUpdateWithoutOwnerInputObjectSchema } from './MenuUpdateWithoutOwnerInput.schema';
import { MenuUncheckedUpdateWithoutOwnerInputObjectSchema } from './MenuUncheckedUpdateWithoutOwnerInput.schema';
import { MenuCreateWithoutOwnerInputObjectSchema } from './MenuCreateWithoutOwnerInput.schema';
import { MenuUncheckedCreateWithoutOwnerInputObjectSchema } from './MenuUncheckedCreateWithoutOwnerInput.schema';

import type { Prisma } from '../../../old-client';

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
