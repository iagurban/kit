import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProjectUpdateManyMutationInput } from './project-update-many-mutation.input';
import { ProjectWhereInput } from './project-where.input';

@ArgsType()
export class UpdateManyProjectArgs {
  @Field(() => ProjectUpdateManyMutationInput, { nullable: false })
  @Type(() => ProjectUpdateManyMutationInput)
  data!: ProjectUpdateManyMutationInput;

  @Field(() => ProjectWhereInput, { nullable: true })
  @Type(() => ProjectWhereInput)
  where?: ProjectWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
