import { Resolver, Authorized, Mutation, Ctx, Arg, FieldResolver, Query, Root } from "type-graphql";
import { Task } from "../models/Task";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { CreateTaskInput } from "./types/TaskInput";
import { User } from "../models/User";
import { Project } from "../models/Project";
import { List } from "../models/List";

@Resolver(of => Task)
export class TaskResolver {
    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
        @InjectRepository(List) private readonly listRepository: Repository<List>
    ) {}

    @Authorized()
    @Query(returns => [Task])
    async getTasks(@Ctx('user') user: User): Promise<Task[]> {
        return this.taskRepository.find({ relations: ['user'], where: { deleted_timestamp: null, user: user }})
    }

    @Authorized()
    @Mutation(returns => Task)
    async createTask(@Arg('createTaskInput') input: CreateTaskInput, @Ctx('user') user: User): Promise<Task> {
        const list = await this.listRepository.findOneOrFail({ id: input.listId })
        const task = this.taskRepository.create({
            name: input.name,
            notes: input.notes,
            list: list,
            columnPos: input.columnPos,
            user: user
        })

        if (input.projectIds) {
            const projects = await this.projectRepository.findByIds(input.projectIds)
            if (!projects) {
                throw Error(`No projects found with passed in ids: ${input.projectIds}`)
            } else {
                task.projects = projects
            }
        }
        return this.taskRepository.save(task)
    }

    @FieldResolver()
    async user(@Root() task: Task): Promise<User> {
        const taskEntity = await this.taskRepository.findOneOrFail(task.id, { relations: ['user'] })
        return taskEntity.user
    }

    @FieldResolver()
    async projects(@Root() task: Task): Promise<Project[]> {
        const taskEntity = await this.taskRepository.findOneOrFail(task.id, { relations: ['projects'] })
        return taskEntity.projects
    }

    @FieldResolver()
    async list(@Root() task: Task): Promise<List> {
        const taskEntity = await this.taskRepository.findOneOrFail(task.id, { relations: ['list'] })
        return taskEntity.list
    }

}
