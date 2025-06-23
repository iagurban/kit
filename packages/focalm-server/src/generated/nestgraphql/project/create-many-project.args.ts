import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProjectCreateManyInput } from './project-create-many.input';

@ArgsType()
export class CreateManyProjectArgs {
  @Field(() => [ProjectCreateManyInput], { nullable: false })
  @Type(() => ProjectCreateManyInput)
  data!: Array<ProjectCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
