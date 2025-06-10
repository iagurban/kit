import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { UploadedFileListRelationFilter } from '../uploaded-file/uploaded-file-list-relation-filter.input';
import { Type } from 'class-transformer';

@InputType()
export class StoredFileWhereInput {

    @Field(() => [StoredFileWhereInput], {nullable:true})
    AND?: Array<StoredFileWhereInput>;

    @Field(() => [StoredFileWhereInput], {nullable:true})
    OR?: Array<StoredFileWhereInput>;

    @Field(() => [StoredFileWhereInput], {nullable:true})
    NOT?: Array<StoredFileWhereInput>;

    @Field(() => UuidFilter, {nullable:true})
    id?: UuidFilter;

    @Field(() => StringFilter, {nullable:true})
    hash?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    size?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => UploadedFileListRelationFilter, {nullable:true})
    @Type(() => UploadedFileListRelationFilter)
    uploads?: UploadedFileListRelationFilter;
}
