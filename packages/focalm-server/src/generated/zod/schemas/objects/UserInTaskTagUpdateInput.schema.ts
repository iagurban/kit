import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UserInTaskUpdateOneRequiredWithoutTagsNestedInputObjectSchema } from './UserInTaskUpdateOneRequiredWithoutTagsNestedInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagUpdateInput> = z
  .object({
    tag: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    userInTask: z.lazy(() => UserInTaskUpdateOneRequiredWithoutTagsNestedInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskTagUpdateInputObjectSchema = Schema;
