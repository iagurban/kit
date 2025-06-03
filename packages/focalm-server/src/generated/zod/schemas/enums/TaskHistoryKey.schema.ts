import { z } from 'zod';

export const TaskHistoryKeySchema = z.enum([
  'title',
  'state',
  'archived',
  'impact',
  'ease',
  'authorId',
  'responsibleId',
  'orderKey',
  'parentId',
]);
