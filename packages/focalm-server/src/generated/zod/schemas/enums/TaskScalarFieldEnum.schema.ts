import { z } from 'zod';

export const TaskScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'state',
  'archived',
  'impact',
  'ease',
  'startAfterDate',
  'startAfterOffset',
  'plannedStartDate',
  'plannedStartOffset',
  'dueToDate',
  'dueToOffset',
  'createdAt',
  'updatedAt',
  'authorId',
  'responsibleId',
  'parentId',
  'orderKey',
]);
