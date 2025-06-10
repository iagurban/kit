import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { TaskUpdateOneRequiredWithoutParticipantsNestedInputObjectSchema } from './TaskUpdateOneRequiredWithoutParticipantsNestedInput.schema';
import { UserInTaskTagUpdateManyWithoutUserInTaskNestedInputObjectSchema } from './UserInTaskTagUpdateManyWithoutUserInTaskNestedInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUpdateWithoutUserInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    task: z.lazy(() => TaskUpdateOneRequiredWithoutParticipantsNestedInputObjectSchema).optional(),
    tags: z.lazy(() => UserInTaskTagUpdateManyWithoutUserInTaskNestedInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskUpdateWithoutUserInputObjectSchema = Schema;
