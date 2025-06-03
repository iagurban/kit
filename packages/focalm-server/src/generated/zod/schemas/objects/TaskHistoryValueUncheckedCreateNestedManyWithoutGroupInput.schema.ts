import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueCreateManyGroupInputEnvelopeObjectSchema } from './TaskHistoryValueCreateManyGroupInputEnvelope.schema';
import { TaskHistoryValueCreateOrConnectWithoutGroupInputObjectSchema } from './TaskHistoryValueCreateOrConnectWithoutGroupInput.schema';
import { TaskHistoryValueCreateWithoutGroupInputObjectSchema } from './TaskHistoryValueCreateWithoutGroupInput.schema';
import { TaskHistoryValueUncheckedCreateWithoutGroupInputObjectSchema } from './TaskHistoryValueUncheckedCreateWithoutGroupInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './TaskHistoryValueWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskHistoryValueCreateWithoutGroupInputObjectSchema),
        z.lazy(() => TaskHistoryValueCreateWithoutGroupInputObjectSchema).array(),
        z.lazy(() => TaskHistoryValueUncheckedCreateWithoutGroupInputObjectSchema),
        z.lazy(() => TaskHistoryValueUncheckedCreateWithoutGroupInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => TaskHistoryValueCreateOrConnectWithoutGroupInputObjectSchema),
        z.lazy(() => TaskHistoryValueCreateOrConnectWithoutGroupInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TaskHistoryValueCreateManyGroupInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema),
        z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInputObjectSchema = Schema;
