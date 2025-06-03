import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateWithoutMenuInputObjectSchema } from './UploadedFileCreateWithoutMenuInput.schema';
import { UploadedFileUncheckedCreateWithoutMenuInputObjectSchema } from './UploadedFileUncheckedCreateWithoutMenuInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileCreateOrConnectWithoutMenuInput> = z
  .object({
    where: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UploadedFileCreateWithoutMenuInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedCreateWithoutMenuInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileCreateOrConnectWithoutMenuInputObjectSchema = Schema;
