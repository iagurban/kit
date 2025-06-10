import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateOrConnectWithoutTagsInputObjectSchema } from './UserInTaskCreateOrConnectWithoutTagsInput.schema';
import { UserInTaskCreateWithoutTagsInputObjectSchema } from './UserInTaskCreateWithoutTagsInput.schema';
import { UserInTaskUncheckedCreateWithoutTagsInputObjectSchema } from './UserInTaskUncheckedCreateWithoutTagsInput.schema';
import { UserInTaskUncheckedUpdateWithoutTagsInputObjectSchema } from './UserInTaskUncheckedUpdateWithoutTagsInput.schema';
import { UserInTaskUpdateWithoutTagsInputObjectSchema } from './UserInTaskUpdateWithoutTagsInput.schema';
import { UserInTaskUpsertWithoutTagsInputObjectSchema } from './UserInTaskUpsertWithoutTagsInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUpdateOneRequiredWithoutTagsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserInTaskCreateWithoutTagsInputObjectSchema),
        z.lazy(() => UserInTaskUncheckedCreateWithoutTagsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserInTaskCreateOrConnectWithoutTagsInputObjectSchema).optional(),
    upsert: z.lazy(() => UserInTaskUpsertWithoutTagsInputObjectSchema).optional(),
    connect: z.lazy(() => UserInTaskWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserInTaskUpdateWithoutTagsInputObjectSchema),
        z.lazy(() => UserInTaskUncheckedUpdateWithoutTagsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserInTaskUpdateOneRequiredWithoutTagsNestedInputObjectSchema = Schema;
