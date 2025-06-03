import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileUncheckedUpdateWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutUploaderInput.schema';
import { UploadedFileUpdateWithoutUploaderInputObjectSchema } from './UploadedFileUpdateWithoutUploaderInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileUpdateWithWhereUniqueWithoutUploaderInput> = z
  .object({
    where: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => UploadedFileUpdateWithoutUploaderInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedUpdateWithoutUploaderInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileUpdateWithWhereUniqueWithoutUploaderInputObjectSchema = Schema;
