import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagUserInTaskIdTagCompoundUniqueInputObjectSchema } from './UserInTaskTagUserInTaskIdTagCompoundUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagWhereUniqueInput> = z
  .object({
    userInTaskId_tag: z.lazy(() => UserInTaskTagUserInTaskIdTagCompoundUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskTagWhereUniqueInputObjectSchema = Schema;
