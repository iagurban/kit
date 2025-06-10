import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutUploadedFilesNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutUploadedFilesNestedInput.schema';
import { StoredFileUpdateOneRequiredWithoutUploadsNestedInputObjectSchema } from './StoredFileUpdateOneRequiredWithoutUploadsNestedInput.schema';
import { ItemUpdateManyWithoutImageNestedInputObjectSchema } from './ItemUpdateManyWithoutImageNestedInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileUpdateWithoutMenuInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    originalName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    mimetype: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    uploadedAt: z
      .union([z.coerce.dateStr(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    uploader: z.lazy(() => UserUpdateOneRequiredWithoutUploadedFilesNestedInputObjectSchema).optional(),
    storedFile: z.lazy(() => StoredFileUpdateOneRequiredWithoutUploadsNestedInputObjectSchema).optional(),
    usingItems: z.lazy(() => ItemUpdateManyWithoutImageNestedInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileUpdateWithoutMenuInputObjectSchema = Schema;
