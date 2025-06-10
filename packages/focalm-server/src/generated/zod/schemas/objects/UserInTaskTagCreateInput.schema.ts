import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateNestedOneWithoutTagsInputObjectSchema } from './UserInTaskCreateNestedOneWithoutTagsInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagCreateInput> = z
  .object({
    tag: z.string(),
    userInTask: z.lazy(() => UserInTaskCreateNestedOneWithoutTagsInputObjectSchema),
  })
  .strict();

export const UserInTaskTagCreateInputObjectSchema = Schema;
