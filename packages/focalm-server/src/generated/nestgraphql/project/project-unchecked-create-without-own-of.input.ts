import { Field, InputType } from '@nestjs/graphql';

import { TaskUncheckedCreateNestedManyWithoutProjectInput } from '../task/task-unchecked-create-nested-many-without-project.input';
import { TaskToTaskRelationTypeUncheckedCreateNestedManyWithoutProjectInput } from '../task-to-task-relation-type/task-to-task-relation-type-unchecked-create-nested-many-without-project.input';
import { UserInProjectUncheckedCreateNestedManyWithoutProjectInput } from '../user-in-project/user-in-project-unchecked-create-nested-many-without-project.input';

@InputType()
export class ProjectUncheckedCreateWithoutOwnOfInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  tasksCounter?: bigint | number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  abbrev?: string;

  @Field(() => TaskToTaskRelationTypeUncheckedCreateNestedManyWithoutProjectInput, { nullable: true })
  relationTypes?: TaskToTaskRelationTypeUncheckedCreateNestedManyWithoutProjectInput;

  @Field(() => TaskUncheckedCreateNestedManyWithoutProjectInput, { nullable: true })
  tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput;

  @Field(() => UserInProjectUncheckedCreateNestedManyWithoutProjectInput, { nullable: true })
  usersPermissions?: UserInProjectUncheckedCreateNestedManyWithoutProjectInput;
}
