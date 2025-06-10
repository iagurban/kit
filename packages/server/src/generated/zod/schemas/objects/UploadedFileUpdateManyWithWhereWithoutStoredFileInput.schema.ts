import { z } from 'zod';
import { UploadedFileScalarWhereInputObjectSchema } from './UploadedFileScalarWhereInput.schema';
import { UploadedFileUpdateManyMutationInputObjectSchema } from './UploadedFileUpdateManyMutationInput.schema';
import { UploadedFileUncheckedUpdateManyWithoutUploadsInputObjectSchema } from './UploadedFileUncheckedUpdateManyWithoutUploadsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileUpdateManyWithWhereWithoutStoredFileInput> = z
  .object({
    where: z.lazy(() => UploadedFileScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => UploadedFileUpdateManyMutationInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedUpdateManyWithoutUploadsInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileUpdateManyWithWhereWithoutStoredFileInputObjectSchema = Schema;
