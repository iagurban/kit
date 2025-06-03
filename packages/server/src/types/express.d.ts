import { Request } from 'express';

import { CurrentUser } from '../decorators/current-user';

declare module 'express' {
  export interface Request {
    user?: CurrentUser;
  }
}
