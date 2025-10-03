import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { StoredFileAvgAggregate } from './stored-file-avg-aggregate.output';
import { StoredFileCountAggregate } from './stored-file-count-aggregate.output';
import { StoredFileMaxAggregate } from './stored-file-max-aggregate.output';
import { StoredFileMinAggregate } from './stored-file-min-aggregate.output';
import { StoredFileSumAggregate } from './stored-file-sum-aggregate.output';

@ObjectType()
export class StoredFileGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  checksum!: string;

  @Field(() => String, { nullable: false })
  sizeBytes!: bigint | number;

  @Field(() => String, { nullable: false })
  originalFilename!: string;

  @Field(() => String, { nullable: false })
  mimeType!: string;

  @Field(() => String, { nullable: false })
  storageKey!: string;

  @Field(() => String, { nullable: false })
  cdnUrl!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: any;

  @Field(() => String, { nullable: false })
  uploadedByUserId!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date | string;

  @Field(() => StoredFileCountAggregate, { nullable: true })
  _count?: StoredFileCountAggregate;

  @Field(() => StoredFileAvgAggregate, { nullable: true })
  _avg?: StoredFileAvgAggregate;

  @Field(() => StoredFileSumAggregate, { nullable: true })
  _sum?: StoredFileSumAggregate;

  @Field(() => StoredFileMinAggregate, { nullable: true })
  _min?: StoredFileMinAggregate;

  @Field(() => StoredFileMaxAggregate, { nullable: true })
  _max?: StoredFileMaxAggregate;
}
