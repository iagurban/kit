import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UploadedFileWhereInput } from './uploaded-file-where.input';
import { Type } from 'class-transformer';
import { UploadedFileOrderByWithRelationInput } from './uploaded-file-order-by-with-relation.input';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UploadedFileCountAggregateInput } from './uploaded-file-count-aggregate.input';
import { UploadedFileMinAggregateInput } from './uploaded-file-min-aggregate.input';
import { UploadedFileMaxAggregateInput } from './uploaded-file-max-aggregate.input';

@ArgsType()
export class UploadedFileAggregateArgs {

    @Field(() => UploadedFileWhereInput, {nullable:true})
    @Type(() => UploadedFileWhereInput)
    where?: UploadedFileWhereInput;

    @Field(() => [UploadedFileOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UploadedFileOrderByWithRelationInput>;

    @Field(() => UploadedFileWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => UploadedFileCountAggregateInput, {nullable:true})
    _count?: UploadedFileCountAggregateInput;

    @Field(() => UploadedFileMinAggregateInput, {nullable:true})
    _min?: UploadedFileMinAggregateInput;

    @Field(() => UploadedFileMaxAggregateInput, {nullable:true})
    _max?: UploadedFileMaxAggregateInput;
}
