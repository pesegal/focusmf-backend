import { Resolver, Mutation, Arg, Authorized, Ctx, Query, FieldResolver, Root } from "type-graphql"
import { User } from "../models/User"
import { InjectRepository } from "typeorm-typedi-extensions"
import { Repository, Not } from "typeorm"
import { Project } from "../models/Project"
import { Color } from "../models/Color"
import { defaultColorName } from "../helpers/DefaultData"
import { ProjectInput } from "./types/ProjectInput";

@Resolver(of => Project)
export class ProjectResolver {
  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(Color) private readonly colorRepository: Repository<Color>
  ) {}

  // Queries
  @Authorized()
  @Query(returns => [Project])
  async getProjects(@Ctx("user") user: User): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['user'], where: { deleted_timestamp: null, user: user }})
  }

  // Mutations
  @Authorized()
  @Mutation(returns => Project)
  async createProject(@Arg("name") name: string, @Arg("colorName") colorName: string, @Ctx("user") user: User): Promise<Project> {
    let color = await this.colorRepository.findOne({ name: colorName })
    // TODO(peter): The default behavior when an invalid color id is passed is to default, re-examine this behavior later.
    if (!color) {
      color = await this.colorRepository.findOne({ name: defaultColorName })
    }
    const project = this.projectRepository.create({ name, user: user, color: color })
    const projectSaveResponse = await this.projectRepository.save(project)
    return projectSaveResponse
  }

  @Authorized()
  @Mutation(returns => Project)
  async updateProject(@Arg('projectInput') projectInput: ProjectInput, @Ctx('user') user: User): Promise<Project> {
    const project = await this.projectRepository.findOneOrFail(projectInput.id, { relations: ['color'] })
    if (projectInput.colorId) {
      project.color = await this.colorRepository.findOneOrFail({ id: projectInput.colorId })
    } else if (projectInput.colorName) {
      project.color = await this.colorRepository.findOneOrFail({ name: projectInput.colorName })
    }
    if (projectInput.name) {
      project.name = projectInput.name
    }
    return this.projectRepository.save(project)
  }

  @Authorized()
  @Mutation(returns => Project)
  async deleteProject(@Arg('projectInput') projectInput: ProjectInput, @Ctx('user') user: User): Promise<Project> {
    const project = await this.projectRepository.findOneOrFail(projectInput.id)
    project.deleted_timestamp = new Date() // TODO: Investigate how does JS and PG default timezones??
    return this.projectRepository.save(project)
  }

  // Field Resolvers
  @FieldResolver()
  async user(@Root() project: Project): Promise<User> {
    const projectEntity = await this.projectRepository.findOneOrFail(project.id, { relations: ['user'] })
    return projectEntity.user
  }

  @FieldResolver()
  async color(@Root() project: Project): Promise<Color> {
    const projectEntity = await this.projectRepository.findOneOrFail(project.id, { relations: ['color'] })
    return projectEntity.color
  }
}
