import { InjectRepository } from "typeorm-typedi-extensions"
import { User } from "../models/User";
import { Repository } from "typeorm";
import { Permission } from "../models/Permission";
import { Resolver, Query, FieldResolver, Root, Arg } from "type-graphql";

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

    @Query(returns => User)
    async findUserById(@Arg("userId") userId: string): Promise<User | undefined> {
        return this.userRepository.findOne({ id: userId });
    } 

    @Query(returns => User)
    async findUserByEmail(@Arg("userEmail") userEmail: string): Promise<User | undefined> {
        return this.userRepository.findOne({ email: userEmail });
    } 

    @FieldResolver()
    async permissions(@Root() user: User): Promise<Permission[]> {
        return (await this.permissionRepository.find({user}))
    } 
}