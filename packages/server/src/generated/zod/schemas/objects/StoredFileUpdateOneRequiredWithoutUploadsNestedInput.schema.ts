import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StoredFileCreateOrConnectWithoutUploadsInputObjectSchema } from './StoredFileCreateOrConnectWithoutUploadsInput.schema';
import { StoredFileCreateWithoutUploadsInputObjectSchema } from './StoredFileCreateWithoutUploadsInput.schema';
import { StoredFileUncheckedCreateWithoutUploadsInputObjectSchema } from './StoredFileUncheckedCreateWithoutUploadsInput.schema';
import { StoredFileUncheckedUpdateWithoutUploadsInputObjectSchema } from './StoredFileUncheckedUpdateWithoutUploadsInput.schema';
import { StoredFileUpdateWithoutUploadsInputObjectSchema } from './StoredFileUpdateWithoutUploadsInput.schema';
import { StoredFileUpsertWithoutUploadsInputObjectSchema } from './StoredFileUpsertWithoutUploadsInput.schema';
import { StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';

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
