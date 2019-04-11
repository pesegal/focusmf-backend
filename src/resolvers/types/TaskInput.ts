import { InputType, Field, ID } from "type-graphql";
import { Task } from "../../models/Task";
import { MaxLength, IsUUID, IsInt, IsArray } from "class-validator";
import { string } from "joi";


@InputType({ description: "Input format for creating a new task" })
export class CreateTaskInput implements Partial<Task> {
    @Field({ description: "Name of the task"})
    @MaxLength(120)
    name!: string

    @Field({ nullable: true, description: "Notes attached to the task itself" })
    notes!: string

    @Field({ description: "List Id" })
    @IsUUID()
    listId!:  string

    @Field({ defaultValue: 0, nullable: true, description: "Initial position in the list. Defaults to 0." })
    @IsInt()
    columnPos!: number

    @Field(type => [ID], { nullable: true, description: "List of project Id's that are assigned to this task." })
    @IsArray()
    projectIds!: string[]
}

@InputType({ description: "Input format for updating a task." })
export class UpdateTaskInput implements Partial<Task> {
    @Field({ description: "Task's ID" })
    @IsUUID()
    id!: string

    @Field({ nullable:true, description: "Name of the task"})
    @MaxLength(120)
    name!: string

    @Field({ nullable: true, description: "Notes attached to the task itself" })
    notes!: string

    @Field({ nullable: true, description: "List Id" })
    @IsUUID()
    listId!:  string

    @Field({ defaultValue: 0, nullable: true, description: "Initial position in the list. Defaults to 0." })
    @IsInt()
    columnPos!: number

    @Field(type => [ID], { nullable: true, description: "List of project Id's that are assigned to this task." })
    @IsArray()
    projectIds!: string[]
}
