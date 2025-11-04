import { UseGuards } from '@nestjs/common';
import {
  Args,
  ArgsType,
  createUnionType,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { AppUser } from '@poslah/util/modules/auth-module/auth.types';
import { CurrentUser } from '@poslah/util/modules/auth-module/decorators/current-user';
import { GqlJwtAuthGuard } from '@poslah/util/modules/auth-module/guards/gql-jwt-auth-guard';
import { z } from 'zod/v4';

import {
  FilesService,
  guideFailedResponseSchema,
  guideFileResponseSchema,
  guideResponseSchema,
  guideUploadResponseSchema,
  ReportArgs,
} from './files.service';

@ObjectType('UploadPart')
class UploadPart {
  @Field(() => Int)
  partNumber!: number;

  @Field()
  chunkId!: string;
}

@ObjectType()
export class GuideUpload implements Omit<z.infer<typeof guideUploadResponseSchema>, 'type'> {
  @Field(() => [UploadPart])
  uploads!: UploadPart[];
}

@ObjectType('UploadedFile')
class UploadedFile {
  @Field()
  id!: string;

  @Field()
  cdnUrl!: string;
}

@ObjectType()
export class GuideFile implements Omit<z.infer<typeof guideFileResponseSchema>, 'type'> {
  @Field(() => UploadedFile)
  file!: UploadedFile;
}

@ObjectType()
export class GuideFailed implements Omit<z.infer<typeof guideFailedResponseSchema>, 'type'> {
  @Field()
  error!: string;
}

export const GuideResponseUnion: Omit<z.infer<typeof guideResponseSchema>, 'type'> = createUnionType({
  name: 'GuideResponse',
  types: () => [GuideUpload, GuideFile, GuideFailed] as const,
  resolveType(value) {
    if ('uploads' in value) {
      return GuideUpload;
    }
    if ('file' in value) {
      return GuideFile;
    }
    if ('error' in value) {
      return GuideFailed;
    }
    return null;
  },
});

// --- Input and Args Types ---

@ArgsType()
export class GetLinkArgs {
  @Field()
  checksumSha256!: string;
}

@InputType()
export class ReportChunkInput implements ReportArgs {
  @Field({ nullable: true })
  eTag?: string;

  @Field(() => Int, { nullable: true })
  status?: number;

  @Field({ nullable: true })
  message?: string;
}

@ObjectType()
export class GetLinkResponse {
  @Field()
  upload!: string;

  @Field()
  reportToken!: string;
}

@Resolver()
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => GuideResponseUnion)
  async createOrJoinUploadSession(
    @CurrentUser() user: AppUser,
    @Args('checksum') checksum: string,
    @Args('sizeBytes', { type: () => BigInt }) sizeBytes: bigint,
    @Args('originalFilename') originalFilename: string,
    @Args('mimeType') mimeType: string,
    @Args('totalChunks', { type: () => Int }) totalChunks: number,
    @Args('parallel', { type: () => Int, nullable: true }) parallel?: number
  ): Promise<typeof GuideResponseUnion> {
    return this.filesService.createOrJoinUploadSession(
      {
        checksum,
        sizeBytes,
        originalFilename,
        mimeType,
        totalChunks,
        parallel,
      },
      user.id
    );
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => GetLinkResponse)
  async getUrlForChunk(
    @Args('chunkId') chunkId: string,
    @Args() args: GetLinkArgs
  ): Promise<GetLinkResponse> {
    return this.filesService.getUrlForChunk(chunkId, args);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => GuideResponseUnion)
  async reportChunk(
    @Args('reportToken') reportToken: string,
    @Args('body') body: ReportChunkInput,
    @Args('parallel', { type: () => Int, nullable: true }) parallel?: number
  ): Promise<typeof GuideResponseUnion> {
    return this.filesService.reportChunk(reportToken, body, parallel);
  }
}
