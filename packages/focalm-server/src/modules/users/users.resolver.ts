import { Query, Resolver } from '@nestjs/graphql';

import { ParticipantRole } from '../../generated/nestgraphql/participant-role/participant-role.model';
import { User } from '../../generated/nestgraphql/user/user.model';
import { DbService } from '../db/db.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(readonly db: DbService) {}

  @Query(() => [ParticipantRole])
  async participantsRoles(): Promise<ParticipantRole[]> {
    return this.db.transaction.participantRole.findMany();
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.db.transaction.user.findMany();
  }
}
