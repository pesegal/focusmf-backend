import { Resolver, Authorized, Query, Ctx, Field, FieldResolver, Root, Mutation, Arg } from "type-graphql";
import { TaskAction } from "../models/TaskAction"
import { InjectRepository } from "typeorm-typedi-extensions"
import { User } from "../models/User"
import { Task } from "../models/Task"
import { Repository, LessThanOrEqual, MoreThanOrEqual} from "typeorm"
import { CreateTaskAction } from "./types/TaskActionInput"

@Resolver(of => TaskAction)
export class TaskActionResolver {
    constructor(
        @InjectRepository(TaskAction) private readonly taskActionRepository: Repository<TaskAction>,
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>
    ) {}

    @Authorized()
    @Query(returns => [TaskAction])
    async getAllTaskActions(@Ctx('user') user: User): Promise<TaskAction[]> {
        return this.taskActionRepository.find({ relations: ['task'], where: { user: user }})
    }

    @Authorized()
    @Query(returns => [TaskAction])
    async getRangeTaskActions(@Arg('start') start: Date, @Arg('end') end: Date, @Ctx('user') user: User): Promise<TaskAction[]> {
        return this.taskActionRepository.find({
            relations: ['task'], 
            where: { 
                user: user,
                start: MoreThanOrEqual(start),
                end: LessThanOrEqual(end)           
            },
            order: {
                start: "ASC"
            }        
        })
    }

    @Authorized()
    @Mutation(returns => TaskAction)
    async createTaskAction(@Arg('taskAction') taskAction: CreateTaskAction, @Ctx('user') user: User): Promise<TaskAction> {
        const task = await this.taskRepository.findOneOrFail(taskAction.taskId)
        const newTaskAction = this.taskActionRepository.create({
            task: task,
            start: taskAction.start,
            end: taskAction.end,
            actionType: taskAction.actionType
        })
        return this.taskActionRepository.save(newTaskAction)
    }

    @FieldResolver()
    async task(@Root() taskAction: TaskAction): Promise<Task> {
        const ta = await this.taskActionRepository.findOneOrFail(taskAction.id, { relations: ['task'] })
        return ta.task
    }
}
