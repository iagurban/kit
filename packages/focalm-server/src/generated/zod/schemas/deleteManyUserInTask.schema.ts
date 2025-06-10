import { z } from 'zod';

import { UserInTaskWhereInputObjectSchema } from './objects/UserInTaskWhereInput.schema';

export const UserInTaskDeleteManySchema = z.object({ where: UserInTaskWhereInputObjectSchema.optional() });
