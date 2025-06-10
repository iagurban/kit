import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class UploadedFileScalarWhereWithAggregatesInput {

    @Field(() => [UploadedFileScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<UploadedFileScalarWhereWithAggregatesInput>;

    @Field(() => [UploadedFileScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<UploadedFileScalarWhereWithAggregatesInput>;

    @Field(() => [UploadedFileScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<UploadedFileScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    originalName?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    mimetype?: StringWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    uploadedAt?: DateTimeWithAggregatesFilter;

    @Field(() => UuidWithAggregatesFilter, {nullable:true})
    uploaderId?: UuidWithAggregatesFilter;

    @Field(() => UuidWithAggregatesFilter, {nullable:true})
    storedFileId?: UuidWithAggregatesFilter;

    @Field(() => UuidWithAggregatesFilter, {nullable:true})
    menuId?: UuidWithAggregatesFilter;
}
