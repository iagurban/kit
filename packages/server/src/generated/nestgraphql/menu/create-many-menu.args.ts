import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MenuCreateManyInput } from './menu-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyMenuArgs {

    @Field(() => [MenuCreateManyInput], {nullable:false})
    @Type(() => MenuCreateManyInput)
    data!: Array<MenuCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
