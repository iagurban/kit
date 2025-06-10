import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutMenusInput } from './user-update-without-menus.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutMenusInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutMenusInput, {nullable:false})
    @Type(() => UserUpdateWithoutMenusInput)
    data!: UserUpdateWithoutMenusInput;
}
