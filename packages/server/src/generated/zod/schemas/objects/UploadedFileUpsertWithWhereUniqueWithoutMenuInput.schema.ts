import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateWithoutMenuInputObjectSchema } from './UploadedFileCreateWithoutMenuInput.schema';
import { UploadedFileUncheckedCreateWithoutMenuInputObjectSchema } from './UploadedFileUncheckedCreateWithoutMenuInput.schema';
import { UploadedFileUncheckedUpdateWithoutMenuInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutMenuInput.schema';
import { UploadedFileUpdateWithoutMenuInputObjectSchema } from './UploadedFileUpdateWithoutMenuInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileUpsertWithWhereUniqueWithoutMenuInput> = z
  .object({
    where: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => UploadedFileUpdateWithoutMenuInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedUpdateWithoutMenuInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UploadedFileCreateWithoutMenuInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedCreateWithoutMenuInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileUpsertWithWhereUniqueWithoutMenuInputObjectSchema = Schema;
