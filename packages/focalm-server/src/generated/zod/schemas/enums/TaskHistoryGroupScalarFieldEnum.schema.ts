import { z } from 'zod';

export const TaskHistoryGroupScalarFieldEnumSchema = z.enum([
  'id',
  'authorId',
  'localCreatedAt',
  'createdAt',
  'createdAtFixReason',
]);
