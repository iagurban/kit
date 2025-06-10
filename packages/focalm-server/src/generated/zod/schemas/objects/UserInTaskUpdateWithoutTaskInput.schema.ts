import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UserInTaskTagUpdateManyWithoutUserInTaskNestedInputObjectSchema } from './UserInTaskTagUpdateManyWithoutUserInTaskNestedInput.schema';
import { UserUpdateOneRequiredWithoutParticipatingTasksNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutParticipatingTasksNestedInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUpdateWithoutTaskInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    user: z.lazy(() => UserUpdateOneRequiredWithoutParticipatingTasksNestedInputObjectSchema).optional(),
    tags: z.lazy(() => UserInTaskTagUpdateManyWithoutUserInTaskNestedInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskUpdateWithoutTaskInputObjectSchema = Schema;
