import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { TaskUpdateOneRequiredWithoutParticipantsNestedInputObjectSchema } from './TaskUpdateOneRequiredWithoutParticipantsNestedInput.schema';
import { UserInTaskTagUpdateManyWithoutUserInTaskNestedInputObjectSchema } from './UserInTaskTagUpdateManyWithoutUserInTaskNestedInput.schema';
import { UserUpdateOneRequiredWithoutParticipatingTasksNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutParticipatingTasksNestedInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    user: z.lazy(() => UserUpdateOneRequiredWithoutParticipatingTasksNestedInputObjectSchema).optional(),
    task: z.lazy(() => TaskUpdateOneRequiredWithoutParticipantsNestedInputObjectSchema).optional(),
    tags: z.lazy(() => UserInTaskTagUpdateManyWithoutUserInTaskNestedInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskUpdateInputObjectSchema = Schema;
