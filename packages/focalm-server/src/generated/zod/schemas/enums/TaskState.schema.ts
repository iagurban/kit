import { z } from 'zod';

export const TaskStateSchema = z.enum(['Pending', 'Active', 'Done']);
