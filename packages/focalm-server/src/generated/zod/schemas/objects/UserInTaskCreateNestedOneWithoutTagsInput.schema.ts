import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateOrConnectWithoutTagsInputObjectSchema } from './UserInTaskCreateOrConnectWithoutTagsInput.schema';
import { UserInTaskCreateWithoutTagsInputObjectSchema } from './UserInTaskCreateWithoutTagsInput.schema';
import { UserInTaskUncheckedCreateWithoutTagsInputObjectSchema } from './UserInTaskUncheckedCreateWithoutTagsInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskCreateNestedOneWithoutTagsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserInTaskCreateWithoutTagsInputObjectSchema),
        z.lazy(() => UserInTaskUncheckedCreateWithoutTagsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserInTaskCreateOrConnectWithoutTagsInputObjectSchema).optional(),
    connect: z.lazy(() => UserInTaskWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskCreateNestedOneWithoutTagsInputObjectSchema = Schema;
