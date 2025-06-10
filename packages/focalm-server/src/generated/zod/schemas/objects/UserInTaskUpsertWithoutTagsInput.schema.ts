import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateWithoutTagsInputObjectSchema } from './UserInTaskCreateWithoutTagsInput.schema';
import { UserInTaskUncheckedCreateWithoutTagsInputObjectSchema } from './UserInTaskUncheckedCreateWithoutTagsInput.schema';
import { UserInTaskUncheckedUpdateWithoutTagsInputObjectSchema } from './UserInTaskUncheckedUpdateWithoutTagsInput.schema';
import { UserInTaskUpdateWithoutTagsInputObjectSchema } from './UserInTaskUpdateWithoutTagsInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUpsertWithoutTagsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserInTaskUpdateWithoutTagsInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedUpdateWithoutTagsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserInTaskCreateWithoutTagsInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedCreateWithoutTagsInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskUpsertWithoutTagsInputObjectSchema = Schema;
