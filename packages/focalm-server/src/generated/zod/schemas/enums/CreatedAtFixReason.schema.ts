import { z } from 'zod';

export const CreatedAtFixReasonSchema = z.enum(['Low', 'High', 'Both']);
