import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagUncheckedUpdateInput> = z
  .object({
    userInTaskId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    tag: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  })
  .strict();

export const UserInTaskTagUncheckedUpdateInputObjectSchema = Schema;
