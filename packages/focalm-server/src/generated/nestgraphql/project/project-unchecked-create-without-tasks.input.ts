import { Field, InputType } from '@nestjs/graphql';

import { TaskToTaskRelationTypeUncheckedCreateNestedManyWithoutProjectInput } from '../task-to-task-relation-type/task-to-task-relation-type-unchecked-create-nested-many-without-project.input';
import { UserUncheckedCreateNestedOneWithoutOwnProjectInput } from '../user/user-unchecked-create-nested-one-without-own-project.input';
import { UserInProjectUncheckedCreateNestedManyWithoutProjectInput } from '../user-in-project/user-in-project-unchecked-create-nested-many-without-project.input';

@InputType()
export class ProjectUncheckedCreateWithoutTasksInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  tasksCounter?: bigint | number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  abbrev?: string;

  @Field(() => UserUncheckedCreateNestedOneWithoutOwnProjectInput, { nullable: true })
  ownOf?: UserUncheckedCreateNestedOneWithoutOwnProjectInput;

  @Field(() => TaskToTaskRelationTypeUncheckedCreateNestedManyWithoutProjectInput, { nullable: true })
  relationTypes?: TaskToTaskRelationTypeUncheckedCreateNestedManyWithoutProjectInput;

  @Field(() => UserInProjectUncheckedCreateNestedManyWithoutProjectInput, { nullable: true })
  usersPermissions?: UserInProjectUncheckedCreateNestedManyWithoutProjectInput;
}
