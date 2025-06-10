import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { MenuWhereUniqueInput } from './menu-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneMenuArgs {

    @Field(() => MenuWhereUniqueInput, {nullable:false})
    @Type(() => MenuWhereUniqueInput)
    where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;
}
