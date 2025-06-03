import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileScalarWhereInputObjectSchema } from './UploadedFileScalarWhereInput.schema';
import { UploadedFileUncheckedUpdateManyWithoutUploadsInputObjectSchema } from './UploadedFileUncheckedUpdateManyWithoutUploadsInput.schema';
import { UploadedFileUpdateManyMutationInputObjectSchema } from './UploadedFileUpdateManyMutationInput.schema';

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
