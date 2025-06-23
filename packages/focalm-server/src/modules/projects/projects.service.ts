import { notNull } from '@gurban/kit/utils/flow-utils';
import { Injectable } from '@nestjs/common';

import { ProjectSelect } from '../../generated/db-client/models/Project';
import { currentUserCtx } from '../../interceptors/current-user-context';
import { DbService } from '../db/db.service';

@Injectable()
export class ProjectsService {
  constructor(readonly db: DbService) {}

  async getProject(id: string | null | undefined, select?: ProjectSelect) {
    return notNull(
      await this.db.transaction.project.findFirst({
        where: id != null ? { id } : { ownOf: { id: currentUserCtx.get().id } },
        select,
      })
    );
  }

  async getProjects(select?: ProjectSelect) {
    return notNull(
      await this.db.transaction.project.findMany({
        where: { ownOf: { id: currentUserCtx.get().id } }, /// TODO added to project
        select,
      })
    );
  }
}
