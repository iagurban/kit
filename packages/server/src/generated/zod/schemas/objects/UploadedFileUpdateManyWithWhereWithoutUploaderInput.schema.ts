import { z } from 'zod';
import { UploadedFileScalarWhereInputObjectSchema } from './UploadedFileScalarWhereInput.schema';
import { UploadedFileUpdateManyMutationInputObjectSchema } from './UploadedFileUpdateManyMutationInput.schema';
import { UploadedFileUncheckedUpdateManyWithoutUploadedFilesInputObjectSchema } from './UploadedFileUncheckedUpdateManyWithoutUploadedFilesInput.schema';

import type { Prisma } from '../../../old-client';

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
