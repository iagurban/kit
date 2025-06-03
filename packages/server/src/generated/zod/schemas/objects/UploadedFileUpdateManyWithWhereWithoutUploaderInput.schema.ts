import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileScalarWhereInputObjectSchema } from './UploadedFileScalarWhereInput.schema';
import { UploadedFileUncheckedUpdateManyWithoutUploadedFilesInputObjectSchema } from './UploadedFileUncheckedUpdateManyWithoutUploadedFilesInput.schema';
import { UploadedFileUpdateManyMutationInputObjectSchema } from './UploadedFileUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileUpdateManyWithWhereWithoutUploaderInput> = z
  .object({
    where: z.lazy(() => UploadedFileScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => UploadedFileUpdateManyMutationInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedUpdateManyWithoutUploadedFilesInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileUpdateManyWithWhereWithoutUploaderInputObjectSchema = Schema;
