import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { TagWhereUniqueInput } from './tag-where-unique.input';
import { Type } from 'class-transformer';
import { TagCreateWithoutMenuInput } from './tag-create-without-menu.input';

@InputType()
export class TagCreateOrConnectWithoutMenuInput {

    @Field(() => TagWhereUniqueInput, {nullable:false})
    @Type(() => TagWhereUniqueInput)
    where!: Prisma.AtLeast<TagWhereUniqueInput, 'id'>;

    @Field(() => TagCreateWithoutMenuInput, {nullable:false})
    @Type(() => TagCreateWithoutMenuInput)
    create!: TagCreateWithoutMenuInput;
}
