import { Resolver, Mutation, Arg, Authorized, Ctx, Query, FieldResolver, Root } from "type-graphql"
import { User } from "../models/User"
import { InjectRepository } from "typeorm-typedi-extensions"
import { Repository } from "typeorm"
import { Project } from "../models/Project"
import { Color } from "../models/Color"
import { defaultColorName } from "../helpers/DefaultData"

@Resolver(of => Project)
export class ProjectResolver {
  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Color) private readonly colorRepository: Repository<Color>
  ) {}

  // Queries
  @Authorized()
  @Query(returns => [Project])
  async getProjects(@Ctx("user") user: User): Promise<Project[]> {
    const userWithProjects = await this.userRepository.findOneOrFail(user.id, { relations: ['projects'] })
    return userWithProjects.projects
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

  // Field Resolvers
  @FieldResolver()
  async user(@Root() project: Project): Promise<User> {
    const projectEntity = await this.projectRepository.findOneOrFail(project.id, { relations: ['user'] })
    return projectEntity.user
  }
}
