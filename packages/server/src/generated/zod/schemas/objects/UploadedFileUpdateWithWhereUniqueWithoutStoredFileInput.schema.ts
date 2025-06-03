import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileUncheckedUpdateWithoutStoredFileInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutStoredFileInput.schema';
import { UploadedFileUpdateWithoutStoredFileInputObjectSchema } from './UploadedFileUpdateWithoutStoredFileInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileUpdateWithWhereUniqueWithoutStoredFileInput> = z
  .object({
    where: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => UploadedFileUpdateWithoutStoredFileInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedUpdateWithoutStoredFileInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileUpdateWithWhereUniqueWithoutStoredFileInputObjectSchema = Schema;
