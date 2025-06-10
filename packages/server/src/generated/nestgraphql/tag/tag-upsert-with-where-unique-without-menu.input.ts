import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { TagWhereUniqueInput } from './tag-where-unique.input';
import { Type } from 'class-transformer';
import { TagUpdateWithoutMenuInput } from './tag-update-without-menu.input';
import { TagCreateWithoutMenuInput } from './tag-create-without-menu.input';

@InputType()
export class TagUpsertWithWhereUniqueWithoutMenuInput {

    @Field(() => TagWhereUniqueInput, {nullable:false})
    @Type(() => TagWhereUniqueInput)
    where!: Prisma.AtLeast<TagWhereUniqueInput, 'id'>;

    @Field(() => TagUpdateWithoutMenuInput, {nullable:false})
    @Type(() => TagUpdateWithoutMenuInput)
    update!: TagUpdateWithoutMenuInput;

    @Field(() => TagCreateWithoutMenuInput, {nullable:false})
    @Type(() => TagCreateWithoutMenuInput)
    create!: TagCreateWithoutMenuInput;
}
