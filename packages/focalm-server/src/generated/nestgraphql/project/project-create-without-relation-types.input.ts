import { Field, InputType } from '@nestjs/graphql';

import { TaskCreateNestedManyWithoutProjectInput } from '../task/task-create-nested-many-without-project.input';
import { UserCreateNestedOneWithoutOwnProjectInput } from '../user/user-create-nested-one-without-own-project.input';
import { UserInProjectCreateNestedManyWithoutProjectInput } from '../user-in-project/user-in-project-create-nested-many-without-project.input';

@InputType()
export class ProjectCreateWithoutRelationTypesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  tasksCounter?: bigint | number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  abbrev?: string;

  @Field(() => UserCreateNestedOneWithoutOwnProjectInput, { nullable: true })
  ownOf?: UserCreateNestedOneWithoutOwnProjectInput;

  @Field(() => TaskCreateNestedManyWithoutProjectInput, { nullable: true })
  tasks?: TaskCreateNestedManyWithoutProjectInput;

  @Field(() => UserInProjectCreateNestedManyWithoutProjectInput, { nullable: true })
  usersPermissions?: UserInProjectCreateNestedManyWithoutProjectInput;
}
