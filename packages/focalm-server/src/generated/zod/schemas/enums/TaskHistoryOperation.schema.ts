import { z } from 'zod';

export const TaskHistoryOperationSchema = z.enum(['Set', 'Add', 'Remove']);
