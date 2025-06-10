import { z } from 'zod';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';
import { MenuUpdateWithoutOwnerInputObjectSchema } from './MenuUpdateWithoutOwnerInput.schema';
import { MenuUncheckedUpdateWithoutOwnerInputObjectSchema } from './MenuUncheckedUpdateWithoutOwnerInput.schema';

import type { Prisma } from '../../../old-client';

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
