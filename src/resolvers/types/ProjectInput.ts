import { InputType, Field } from "type-graphql";
import { Project } from "../../models/Project";
import { IsUUID, MaxLength } from "class-validator";

@InputType({ description: "Update Project Input" })
export class ProjectInput implements Partial<Project> {
    @Field({ description: "Needs to be a valid project UUID."})
    @IsUUID()
    id!: string

    @Field({ nullable: true, description: "Project name!" })
    @MaxLength(240)
    name!: string

    @Field({ nullable: true, description: "Color Name" })
    colorName!: string

    @Field({ nullable: true, description: "Color Id" })
    @IsUUID()
    colorId!: string

}
