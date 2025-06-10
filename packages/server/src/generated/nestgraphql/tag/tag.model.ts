import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Menu } from '../menu/menu.model';

@ObjectType()
export class Tag {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    menuId!: string;

    @Field(() => Menu, {nullable:false})
    menu?: Menu;
}
