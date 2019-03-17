import { Resolver, Mutation, Arg, Authorized, Ctx } from "type-graphql"
import { List } from "../models/List"
import { User } from "../models/User"
import { InjectRepository } from "typeorm-typedi-extensions"
import { Repository } from "typeorm"
import { Task } from "../models/Task"
import { AuthToken } from "../middleware/Authorization"

@Resolver(of => List)
export class ListResolver {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  @Authorized()
  @Mutation(returns => List)
  async createList(@Arg("name") name: string, @Ctx("authToken") authToken: AuthToken): Promise<List> {
    const user = await this.userRepository.findOne({ id: authToken.id })
    const list = this.listRepository.create({ name, user: user })
    const listSaveResponse = await this.listRepository.save(list)
    return listSaveResponse
  }

}
