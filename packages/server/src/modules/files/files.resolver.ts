import { ResolveField, Resolver, Root } from '@nestjs/graphql';

import { UploadedFile } from '../../generated/nestgraphql/uploaded-file/uploaded-file.model';

@Resolver(() => UploadedFile)
export class FilesResolver {
  static readonly dynamicFields = ['url'] as const;

  @ResolveField(() => String)
  url(@Root() self: UploadedFile) {
    return self.storedFileId.replace(/-/g, '/');
  }
}
