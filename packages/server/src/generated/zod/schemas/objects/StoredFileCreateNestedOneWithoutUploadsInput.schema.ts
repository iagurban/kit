import { z } from 'zod';
import { StoredFileCreateWithoutUploadsInputObjectSchema } from './StoredFileCreateWithoutUploadsInput.schema';
import { StoredFileUncheckedCreateWithoutUploadsInputObjectSchema } from './StoredFileUncheckedCreateWithoutUploadsInput.schema';
import { StoredFileCreateOrConnectWithoutUploadsInputObjectSchema } from './StoredFileCreateOrConnectWithoutUploadsInput.schema';
import { StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';

import type { Prisma } from '../../../old-client';

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
