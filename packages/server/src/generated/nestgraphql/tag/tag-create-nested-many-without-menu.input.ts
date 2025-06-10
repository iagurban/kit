import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TagCreateWithoutMenuInput } from './tag-create-without-menu.input';
import { Type } from 'class-transformer';
import { TagCreateOrConnectWithoutMenuInput } from './tag-create-or-connect-without-menu.input';
import { TagCreateManyMenuInputEnvelope } from './tag-create-many-menu-input-envelope.input';
import { Prisma } from '../../db-client';
import { TagWhereUniqueInput } from './tag-where-unique.input';

@InputType()
export class TagCreateNestedManyWithoutMenuInput {

    @Field(() => [TagCreateWithoutMenuInput], {nullable:true})
    @Type(() => TagCreateWithoutMenuInput)
    create?: Array<TagCreateWithoutMenuInput>;

    @Field(() => [TagCreateOrConnectWithoutMenuInput], {nullable:true})
    @Type(() => TagCreateOrConnectWithoutMenuInput)
    connectOrCreate?: Array<TagCreateOrConnectWithoutMenuInput>;

    @Field(() => TagCreateManyMenuInputEnvelope, {nullable:true})
    @Type(() => TagCreateManyMenuInputEnvelope)
    createMany?: TagCreateManyMenuInputEnvelope;

    @Field(() => [TagWhereUniqueInput], {nullable:true})
    @Type(() => TagWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<TagWhereUniqueInput, 'id'>>;
}
