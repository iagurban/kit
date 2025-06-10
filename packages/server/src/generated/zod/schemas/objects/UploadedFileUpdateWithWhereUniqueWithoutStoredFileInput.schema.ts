import { z } from 'zod';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';
import { UploadedFileUpdateWithoutStoredFileInputObjectSchema } from './UploadedFileUpdateWithoutStoredFileInput.schema';
import { UploadedFileUncheckedUpdateWithoutStoredFileInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutStoredFileInput.schema';

import type { Prisma } from '../../../old-client';

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
