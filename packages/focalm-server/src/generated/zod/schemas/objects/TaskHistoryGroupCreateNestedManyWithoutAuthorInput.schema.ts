import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateManyAuthorInputEnvelopeObjectSchema } from './TaskHistoryGroupCreateManyAuthorInputEnvelope.schema';
import { TaskHistoryGroupCreateOrConnectWithoutAuthorInputObjectSchema } from './TaskHistoryGroupCreateOrConnectWithoutAuthorInput.schema';
import { TaskHistoryGroupCreateWithoutAuthorInputObjectSchema } from './TaskHistoryGroupCreateWithoutAuthorInput.schema';
import { TaskHistoryGroupUncheckedCreateWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUncheckedCreateWithoutAuthorInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCreateNestedManyWithoutAuthorInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskHistoryGroupCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskHistoryGroupCreateWithoutAuthorInputObjectSchema).array(),
        z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => TaskHistoryGroupCreateOrConnectWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskHistoryGroupCreateOrConnectWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TaskHistoryGroupCreateManyAuthorInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
        z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TaskHistoryGroupCreateNestedManyWithoutAuthorInputObjectSchema = Schema;
