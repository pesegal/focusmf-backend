import { Resolver, Mutation, Arg, Authorized, Ctx } from "type-graphql"
import { List } from "../models/List"
import { User } from "../models/User"
import { InjectRepository } from "typeorm-typedi-extensions"
import { Repository } from "typeorm"
import { Task } from "../models/Task"
import { AuthenticationError } from "apollo-server";

@Resolver(of => List)
export class ListResolver {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  @Mutation(returns => List)
  async createList(
    @Arg("name") name: string,
    @Ctx("user") user: User
  ): Promise<List> {
    if (!(user instanceof User)) {
      throw new AuthenticationError('Unable to find user')
    }

    const list = this.listRepository.create({ name, user: user })
    const listSaveResponse = await this.listRepository.save(list)
    return listSaveResponse
  }

  @Mutation(returns => List)
  async updateList(
    @Arg('id') id: string,
    @Arg('name') name: string,
    @Ctx('user') user: User
  ): Promise<List|null> {
    if (!(user instanceof User)) {
      throw new AuthenticationError('Unable to find user')
    }

    const list = user.lists.find(list => list.id === id)
    if (!(list instanceof List)) {
      throw new Error(`Unable to find list with id=${id}`)
    }

    list.name = name
    await this.listRepository.update(id, { name })
    return list
  }

  @Mutation(returns => [List])
  async deleteList(@Ctx('user') user: User, @Arg('id') id: string): Promise<List[]> {
    if (!(user instanceof User)) {
      throw new AuthenticationError('Unable to find user')
    }

    await this.listRepository.findOneOrFail(id)
    await this.listRepository.delete(id)
    return (await this.userRepository.findOneOrFail(user.id)).lists
  }

  @Authorized()
  @Query(returns => [List])
  async findListsByUser(@Ctx("user") user: User): Promise<List[]> {
      return user.lists
  }
}
