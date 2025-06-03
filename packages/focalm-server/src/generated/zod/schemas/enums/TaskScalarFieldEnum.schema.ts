import { z } from 'zod';

export const TaskScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'state',
  'archived',
  'impact',
  'ease',
  'startAfter',
  'plannedStart',
  'dueTo',
  'createdAt',
  'updatedAt',
  'authorId',
  'responsibleId',
  'parentId',
  'orderKey',
]);
