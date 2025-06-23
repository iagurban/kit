import { Field, InputType } from '@nestjs/graphql';

import { TaskCreateNestedManyWithoutProjectInput } from '../task/task-create-nested-many-without-project.input';
import { TaskToTaskRelationTypeCreateNestedManyWithoutProjectInput } from '../task-to-task-relation-type/task-to-task-relation-type-create-nested-many-without-project.input';
import { UserCreateNestedOneWithoutOwnProjectInput } from '../user/user-create-nested-one-without-own-project.input';

@InputType()
export class ProjectCreateWithoutUsersPermissionsInput {
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

  @Field(() => TaskToTaskRelationTypeCreateNestedManyWithoutProjectInput, { nullable: true })
  relationTypes?: TaskToTaskRelationTypeCreateNestedManyWithoutProjectInput;

  @Field(() => TaskCreateNestedManyWithoutProjectInput, { nullable: true })
  tasks?: TaskCreateNestedManyWithoutProjectInput;
}
