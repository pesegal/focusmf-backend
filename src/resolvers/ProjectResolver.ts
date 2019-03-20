import { Resolver, Mutation, Arg, Authorized, Ctx } from "type-graphql"
import { List } from "../models/List"
import { User } from "../models/User"
import { InjectRepository } from "typeorm-typedi-extensions"
import { Repository } from "typeorm"
import { Task } from "../models/Task"
import { AuthToken } from "../middleware/Authorization"
import { Project } from "../models/Project"
import { Color } from "../models/Color"
import { defaultColorName } from "../helpers/DefaultData"
import config from "config"

@Resolver(of => Project)
export class ProjectResolver {
  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Color) private readonly colorRepository: Repository<Color>
  ) {}

  @Authorized()
  @Mutation(returns => Project)
  async createProject(@Arg("name") name: string, @Arg("colorName") colorName: string, @Ctx("authToken") authToken: AuthToken): Promise<Project> {
    const user = await this.userRepository.findOne({ id: authToken.id })
    let color = await this.colorRepository.findOne({ name: colorName })
    // TODO(peter): The default behavior when an invalid color id is passed is to default, re-examine this behavior later.
    if (!color) {
      color = await this.colorRepository.findOne({ name: defaultColorName })
    }
    const project = this.projectRepository.create({ name, user: user, color: color })
    const projectSaveResponse = await this.projectRepository.save(project)
    return projectSaveResponse
  }

}
