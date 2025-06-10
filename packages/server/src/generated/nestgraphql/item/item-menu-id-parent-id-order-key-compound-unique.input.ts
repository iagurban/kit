import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ItemMenuIdParentIdOrderKeyCompoundUniqueInput {

    @Field(() => String, {nullable:false})
    menuId!: string;

    @Field(() => String, {nullable:false})
    parentId!: string;

    @Field(() => String, {nullable:false})
    orderKey!: string;
}
