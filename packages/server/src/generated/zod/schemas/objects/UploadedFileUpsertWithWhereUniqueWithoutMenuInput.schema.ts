import { z } from 'zod';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';
import { UploadedFileUpdateWithoutMenuInputObjectSchema } from './UploadedFileUpdateWithoutMenuInput.schema';
import { UploadedFileUncheckedUpdateWithoutMenuInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutMenuInput.schema';
import { UploadedFileCreateWithoutMenuInputObjectSchema } from './UploadedFileCreateWithoutMenuInput.schema';
import { UploadedFileUncheckedCreateWithoutMenuInputObjectSchema } from './UploadedFileUncheckedCreateWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

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
