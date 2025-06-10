import { Field, InputType } from '@nestjs/graphql';

import { CreatedAtFixReason } from '../prisma/created-at-fix-reason.enum';

@InputType()
export class TaskHistoryGroupCreateManyAuthorInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: false })
  localCreatedAt!: Date | string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => CreatedAtFixReason, { nullable: true })
  createdAtFixReason?: `${CreatedAtFixReason}`;
}
