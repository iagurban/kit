import { Request, Response } from 'express';

import type { CurrentUser } from './decorators/current-user';

export type ContextType = {
  req: Request & { user?: CurrentUser };
  res: Response;
  // tasksService: TasksService;
};
