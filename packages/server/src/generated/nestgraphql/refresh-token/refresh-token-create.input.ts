import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutRefreshTokensInput } from '../user/user-create-nested-one-without-refresh-tokens.input';

@InputType()
export class RefreshTokenCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:false})
    expiresAt!: Date | string;

    @Field(() => String, {nullable:false})
    hash!: string;

    @Field(() => UserCreateNestedOneWithoutRefreshTokensInput, {nullable:false})
    user!: UserCreateNestedOneWithoutRefreshTokensInput;
}
