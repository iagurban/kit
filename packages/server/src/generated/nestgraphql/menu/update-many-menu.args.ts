import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MenuUpdateManyMutationInput } from './menu-update-many-mutation.input';
import { Type } from 'class-transformer';
import { MenuWhereInput } from './menu-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyMenuArgs {

    @Field(() => MenuUpdateManyMutationInput, {nullable:false})
    @Type(() => MenuUpdateManyMutationInput)
    data!: MenuUpdateManyMutationInput;

    @Field(() => MenuWhereInput, {nullable:true})
    @Type(() => MenuWhereInput)
    where?: MenuWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
