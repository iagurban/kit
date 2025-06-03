import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuScalarWhereInputObjectSchema } from './MenuScalarWhereInput.schema';
import { MenuUncheckedUpdateManyWithoutMenusInputObjectSchema } from './MenuUncheckedUpdateManyWithoutMenusInput.schema';
import { MenuUpdateManyMutationInputObjectSchema } from './MenuUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.MenuUpdateManyWithWhereWithoutOwnerInput> = z
  .object({
    where: z.lazy(() => MenuScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => MenuUpdateManyMutationInputObjectSchema),
      z.lazy(() => MenuUncheckedUpdateManyWithoutMenusInputObjectSchema),
    ]),
  })
  .strict();

export const MenuUpdateManyWithWhereWithoutOwnerInputObjectSchema = Schema;
