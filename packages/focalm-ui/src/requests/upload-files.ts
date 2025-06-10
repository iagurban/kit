import { z } from 'zod';

import { oEntries, oFromEntries } from '../utils/util';
import { api } from './util';

const uploadResultSchema = z.object({
  files: z.array(
    z.object({
      id: z.string().min(1, 'id cannot be empty'),
      // .regex(/^[a-zA-Z0-9-_]+$/, 'MenuId must contain only letters, numbers, hyphens and underscores'),
      url: z.string().min(1, 'url cannot be empty'),
    })
  ),
});

type UploadResultSchema = z.infer<typeof uploadResultSchema>;

export const uploadFilesArray = async (menuId: string, files: readonly (File | Blob)[]) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append('files', file);
  }
  formData.append('menuId', menuId);

  const res = await api(`files/upload`, { method: 'POST', body: formData });
  if (res.ok) {
    return uploadResultSchema.parse(await res.text()).files;
  }
  throw new Error(`upload failed: [${res.status}] ${res.statusText}: ${await res.text()}`);
};

export const uploadFilesMapping = async <K extends string, R extends Readonly<Record<K, File | Blob>>>(
  menuId: string,
  files: R
): Promise<Record<K, UploadResultSchema[`files`][0]>> => {
  const ee = oEntries(files);
  const result = await uploadFilesArray(
    menuId,
    ee.map(([, file]) => file)
  );
  return oFromEntries(ee.map(([key, _], i) => [key, result[i]]));
};
