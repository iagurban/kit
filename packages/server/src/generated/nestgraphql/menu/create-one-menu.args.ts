import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MenuCreateInput } from './menu-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneMenuArgs {

    @Field(() => MenuCreateInput, {nullable:false})
    @Type(() => MenuCreateInput)
    data!: MenuCreateInput;
}
