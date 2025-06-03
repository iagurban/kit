import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StoredFileCreateOrConnectWithoutUploadsInputObjectSchema } from './StoredFileCreateOrConnectWithoutUploadsInput.schema';
import { StoredFileCreateWithoutUploadsInputObjectSchema } from './StoredFileCreateWithoutUploadsInput.schema';
import { StoredFileUncheckedCreateWithoutUploadsInputObjectSchema } from './StoredFileUncheckedCreateWithoutUploadsInput.schema';
import { StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.StoredFileCreateNestedOneWithoutUploadsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => StoredFileCreateWithoutUploadsInputObjectSchema),
        z.lazy(() => StoredFileUncheckedCreateWithoutUploadsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => StoredFileCreateOrConnectWithoutUploadsInputObjectSchema).optional(),
    connect: z.lazy(() => StoredFileWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const StoredFileCreateNestedOneWithoutUploadsInputObjectSchema = Schema;
