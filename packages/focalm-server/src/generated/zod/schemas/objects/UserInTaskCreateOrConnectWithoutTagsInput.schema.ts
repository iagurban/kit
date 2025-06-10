import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateWithoutTagsInputObjectSchema } from './UserInTaskCreateWithoutTagsInput.schema';
import { UserInTaskUncheckedCreateWithoutTagsInputObjectSchema } from './UserInTaskUncheckedCreateWithoutTagsInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskCreateOrConnectWithoutTagsInput> = z
  .object({
    where: z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserInTaskCreateWithoutTagsInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedCreateWithoutTagsInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskCreateOrConnectWithoutTagsInputObjectSchema = Schema;
