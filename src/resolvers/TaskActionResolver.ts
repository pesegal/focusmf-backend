import { Resolver, Authorized, Query, Ctx, Field, FieldResolver, Root } from "type-graphql";
import { TaskAction } from "../models/TaskAction";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../models/User";
import { Repository } from "typeorm";

@Resolver(of => TaskAction)
export class TaskActionResolver {
    constructor(
        @InjectRepository(TaskAction) private readonly taskActionRepository: Repository<TaskAction>
    ) {}
    
    @Authorized()
    @Query(returns => [TaskAction])
    async getAllTaskActions(@Ctx('user') user: User): Promise<TaskAction[]> {
        return this.taskActionRepository.find({ relations: ['task'], where: { user: user }})
    }

    @FieldResolver()
    async task(@Root() taskAction: TaskAction): Promise<Task> {
        const ta = await this.taskActionRepository.findOneOrFail(taskAction.id, { relations: ['task'] })
        return ta.task
    }
}