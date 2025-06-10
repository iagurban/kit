import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagUncheckedUpdateManyWithoutTagsInput> = z
  .object({
    tag: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  })
  .strict();

export const UserInTaskTagUncheckedUpdateManyWithoutTagsInputObjectSchema = Schema;
