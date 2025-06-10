import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UserInTaskTagUncheckedUpdateManyWithoutUserInTaskNestedInputObjectSchema } from './UserInTaskTagUncheckedUpdateManyWithoutUserInTaskNestedInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUncheckedUpdateWithoutUserInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    taskId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    tags: z.lazy(() => UserInTaskTagUncheckedUpdateManyWithoutUserInTaskNestedInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskUncheckedUpdateWithoutUserInputObjectSchema = Schema;
