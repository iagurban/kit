import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StoredFileCreateWithoutUploadsInputObjectSchema } from './StoredFileCreateWithoutUploadsInput.schema';
import { StoredFileUncheckedCreateWithoutUploadsInputObjectSchema } from './StoredFileUncheckedCreateWithoutUploadsInput.schema';
import { StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.StoredFileCreateOrConnectWithoutUploadsInput> = z
  .object({
    where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => StoredFileCreateWithoutUploadsInputObjectSchema),
      z.lazy(() => StoredFileUncheckedCreateWithoutUploadsInputObjectSchema),
    ]),
  })
  .strict();

export const StoredFileCreateOrConnectWithoutUploadsInputObjectSchema = Schema;
