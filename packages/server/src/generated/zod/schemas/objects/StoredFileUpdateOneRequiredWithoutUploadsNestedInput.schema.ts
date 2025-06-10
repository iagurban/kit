import { z } from 'zod';
import { StoredFileCreateWithoutUploadsInputObjectSchema } from './StoredFileCreateWithoutUploadsInput.schema';
import { StoredFileUncheckedCreateWithoutUploadsInputObjectSchema } from './StoredFileUncheckedCreateWithoutUploadsInput.schema';
import { StoredFileCreateOrConnectWithoutUploadsInputObjectSchema } from './StoredFileCreateOrConnectWithoutUploadsInput.schema';
import { StoredFileUpsertWithoutUploadsInputObjectSchema } from './StoredFileUpsertWithoutUploadsInput.schema';
import { StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileUpdateWithoutUploadsInputObjectSchema } from './StoredFileUpdateWithoutUploadsInput.schema';
import { StoredFileUncheckedUpdateWithoutUploadsInputObjectSchema } from './StoredFileUncheckedUpdateWithoutUploadsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileUpdateOneRequiredWithoutUploadsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => StoredFileCreateWithoutUploadsInputObjectSchema),
        z.lazy(() => StoredFileUncheckedCreateWithoutUploadsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => StoredFileCreateOrConnectWithoutUploadsInputObjectSchema).optional(),
    upsert: z.lazy(() => StoredFileUpsertWithoutUploadsInputObjectSchema).optional(),
    connect: z.lazy(() => StoredFileWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => StoredFileUpdateWithoutUploadsInputObjectSchema),
        z.lazy(() => StoredFileUncheckedUpdateWithoutUploadsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const StoredFileUpdateOneRequiredWithoutUploadsNestedInputObjectSchema = Schema;
