import { z } from 'zod';
import { MenuScalarWhereInputObjectSchema } from './MenuScalarWhereInput.schema';
import { MenuUpdateManyMutationInputObjectSchema } from './MenuUpdateManyMutationInput.schema';
import { MenuUncheckedUpdateManyWithoutMenusInputObjectSchema } from './MenuUncheckedUpdateManyWithoutMenusInput.schema';

import type { Prisma } from '../../../old-client';

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
