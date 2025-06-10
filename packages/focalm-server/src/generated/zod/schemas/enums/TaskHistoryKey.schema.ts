import { z } from 'zod';

export const TaskHistoryKeySchema = z.enum([
  'title',
  'state',
  'archived',
  'impact',
  'ease',
  'authorId',
  'responsibleId',
  'participants',
  'orderKey',
  'parentId',
  'startAfterDate',
  'startAfterOffset',
  'plannedStartDate',
  'plannedStartOffset',
  'dueToDate',
  'dueToOffset',
]);
