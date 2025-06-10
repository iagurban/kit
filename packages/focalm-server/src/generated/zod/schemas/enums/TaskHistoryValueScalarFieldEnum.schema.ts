import { z } from 'zod';

export const TaskHistoryValueScalarFieldEnumSchema = z.enum(['groupId', 'taskId', 'key', 'op', 'value']);
