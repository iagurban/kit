import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuCreateManyOwnerInput } from './menu-create-many-owner.input';
import { Type } from 'class-transformer';

@InputType()
export class MenuCreateManyOwnerInputEnvelope {

    @Field(() => [MenuCreateManyOwnerInput], {nullable:false})
    @Type(() => MenuCreateManyOwnerInput)
    data!: Array<MenuCreateManyOwnerInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
