import { z } from 'zod';

export const TaskHistoryGroupScalarFieldEnumSchema = z.enum([
  'id',
  'taskId',
  'authorId',
  'localCreatedAt',
  'createdAt',
  'createdAtFixReason',
]);
