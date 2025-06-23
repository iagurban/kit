import { registerEnumType } from '@nestjs/graphql';

export enum ProjectScalarFieldEnum {
  id = 'id',
  tasksCounter = 'tasksCounter',
  name = 'name',
  abbrev = 'abbrev',
}

registerEnumType(ProjectScalarFieldEnum, { name: 'ProjectScalarFieldEnum', description: undefined });
