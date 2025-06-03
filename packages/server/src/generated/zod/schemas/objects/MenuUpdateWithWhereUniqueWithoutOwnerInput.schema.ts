import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuUncheckedUpdateWithoutOwnerInputObjectSchema } from './MenuUncheckedUpdateWithoutOwnerInput.schema';
import { MenuUpdateWithoutOwnerInputObjectSchema } from './MenuUpdateWithoutOwnerInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.MenuUpdateWithWhereUniqueWithoutOwnerInput> = z
  .object({
    where: z.lazy(() => MenuWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => MenuUpdateWithoutOwnerInputObjectSchema),
      z.lazy(() => MenuUncheckedUpdateWithoutOwnerInputObjectSchema),
    ]),
  })
  .strict();

export const MenuUpdateWithWhereUniqueWithoutOwnerInputObjectSchema = Schema;
