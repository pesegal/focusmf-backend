import { InputType, Field } from "type-graphql";
import { TaskAction } from "../../models/TaskAction";
import { IsUUID, IsDate } from "class-validator";

@InputType({ description: "Input format for creating a new task"})
export class CreateTaskAction implements Partial<TaskAction> {
    @Field({ description: "A valid Task ID"})
    @IsUUID()
    taskId!: string

    @Field()
    @IsDate() // graphql defaults to isoDate format which includes timezones.
    start!: Date

    @Field()
    @IsDate()
    end!: Date

    @Field()
    actionType!: string
}
