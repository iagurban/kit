import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProjectCreateInput } from './project-create.input';

@ArgsType()
export class CreateOneProjectArgs {
  @Field(() => ProjectCreateInput, { nullable: false })
  @Type(() => ProjectCreateInput)
  data!: ProjectCreateInput;
}
