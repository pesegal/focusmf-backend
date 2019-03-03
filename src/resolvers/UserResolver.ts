import { InjectRepository } from "typeorm-typedi-extensions"
import { User } from "../models/User";
import { Repository } from "typeorm";
import { Permission } from "../models/Permission";
import { Resolver, Query, FieldResolver, Root } from "type-graphql";

@Resolver(of => User)
export class UserResolver {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
     ) {}

    @Query(returns => [User]) 
    allUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    @FieldResolver()
    async permissions(@Root() user: User): Promise<Permission[]> {
        return (await this.permissionRepository.find({user}))
    } 
}