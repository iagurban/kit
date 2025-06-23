import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Field, ID, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { PrismaSelection } from '../../decorators/prisma-selection';
import { Prisma } from '../../generated/db-client';
import { Project } from '../../generated/nestgraphql/project/project.model';
import { ProjectCount } from '../../generated/nestgraphql/project/project-count.output';
import { Task } from '../../generated/nestgraphql/task/task.model';
import { TaskToTaskRelationType } from '../../generated/nestgraphql/task-to-task-relation-type/task-to-task-relation-type.model';
import { User } from '../../generated/nestgraphql/user/user.model';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { ContextualCurrentUserInterceptor } from '../../interceptors/current-user.interceptor';
import { ProjectsService } from './projects.service';

@ObjectType()
export class Project2 extends Project {
  @Field(() => ID, { nullable: false })
  override id!: string;

  @Field(() => User, { nullable: true })
  override ownOf?: User | null;

  @Field(() => String, { nullable: false })
  override name!: string;

  @Field(() => [TaskToTaskRelationType], { nullable: false })
  override relationTypes?: Array<TaskToTaskRelationType>;

  @Field(() => [Task], { nullable: false })
  override tasks?: Array<Task>;

  @Field(() => ProjectCount, { nullable: false })
  override _count?: ProjectCount;
}

@Resolver()
export class ProjectsResolver {
  static readonly dynamicFields = [] as const;

  constructor(readonly projectsService: ProjectsService) {}

  @UseGuards(GqlAuthGuard)
  @UseInterceptors(ContextualCurrentUserInterceptor)
  @Query(() => Project2)
  async project(
    @Args(`id`, { type: () => String, nullable: true }) id: string | undefined,
    @PrismaSelection({ skip: ProjectsResolver.dynamicFields }) select?: Prisma.ProjectSelect
  ): Promise<Project2> {
    return this.projectsService.getProject(id, select);
  }

  @UseGuards(GqlAuthGuard)
  @UseInterceptors(ContextualCurrentUserInterceptor)
  @Query(() => [Project2])
  async projects(
    @PrismaSelection({ skip: ProjectsResolver.dynamicFields }) select?: Prisma.ProjectSelect
  ): Promise<Project2[]> {
    return this.projectsService.getProjects(select);
  }
}
