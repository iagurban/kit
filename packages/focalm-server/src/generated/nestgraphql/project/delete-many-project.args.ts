import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProjectWhereInput } from './project-where.input';

@ArgsType()
export class DeleteManyProjectArgs {
  @Field(() => ProjectWhereInput, { nullable: true })
  @Type(() => ProjectWhereInput)
  where?: ProjectWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
