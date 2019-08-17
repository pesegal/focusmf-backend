import { Resolver, Mutation, Arg, Authorized, Ctx, Query, Field, Root, FieldResolver } from "type-graphql"
import { List } from "../models/List"
import { User } from "../models/User"
import { InjectRepository } from "typeorm-typedi-extensions"
import { Repository } from "typeorm"
import { Task } from "../models/Task"

@Resolver(of => List)
export class ListResolver {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  @Authorized()
  @Mutation(returns => List)
  async createList(
    @Arg("name") name: string,
    @Arg("position") position: number,
    @Ctx("user") user: User
  ): Promise<List> {
    const list = this.listRepository.create({ position, name, user: user })
    const listSaveResponse = await this.listRepository.save(list)
    return listSaveResponse
  }

  @Authorized()
  @Mutation(returns => List)
  async updateList(
    @Arg('id') id: string,
    @Arg('name') name: string,
    @Arg('position') position: number,
    @Ctx('user') user: User
  ): Promise<List|null> {
    const list = user.lists.find(list => list.id === id)
    if (!(list instanceof List)) {
      throw new Error(`Unable to find list with id=${id}`)
    }

    list.name = name
    list.position = position
    await this.listRepository.update(id, { name, position })
    return list
  }

  @Authorized()
  @Mutation(returns => List)
  async deleteList(@Ctx('user') user: User, @Arg('id') id: string): Promise<List> {
    const list = await this.listRepository.findOneOrFail(id, { where: { deleted_timestamp: null }})
    list.deleted_timestamp = new Date()
    return this.listRepository.save(list)
  }

  @Authorized()
  @Query(returns => [List])
  async findListsByUser(@Ctx("user") user: User): Promise<List[]> {
    return this.listRepository.find({
      where: {
        deleted_timestamp: null,
        user
      },
      order: {
        position: "ASC"
      }
    })
  }

  @FieldResolver()
  async tasks(@Root() list: List): Promise<Task[]> {
    return this.taskRepository.find({
      where: {
        deleted_timestamp: null,
        list
      }
    })
  }
}
