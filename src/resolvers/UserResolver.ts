import { InjectRepository } from "typeorm-typedi-extensions"
import { User } from "../models/User";
import { Repository } from "typeorm";
import { Permission } from "../models/Permission";
import { Resolver, Query, FieldResolver, Root, Arg, Mutation } from "type-graphql";
import { UserInput } from "./types/UserInput";
import bcrypt from "bcrypt"

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

    @Mutation(returns => User)
    async createUser(@Arg("userData") newUserData: UserInput): Promise<User> {
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        newUserData.password = await bcrypt.hash(newUserData.password, salt)
        
        // Generate User Object and set default Permission
        const user = this.userRepository.create(newUserData)
        const response = await this.userRepository.save(user)
        const defaultPermission = new Permission()
        defaultPermission.user = response
        await this.permissionRepository.save(defaultPermission)
        response.permissions = [defaultPermission]
        return response
    }

    @FieldResolver()
    async permissions(@Root() user: User): Promise<Permission[]> {
        return (await this.permissionRepository.find({user}))
    } 
}