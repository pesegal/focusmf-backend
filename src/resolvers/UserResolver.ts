import { InjectRepository } from "typeorm-typedi-extensions"
import { User } from "../models/User";
import { Repository } from "typeorm";
import { Permission } from "../models/Permission";
import { Resolver, Query, FieldResolver, Root, Arg, Mutation, ResolverInterface } from "type-graphql";
import { UserInput } from "./types/UserInput";
import bcrypt from "bcrypt"
import { AuthToken } from "./types/AuthToken";
import { AuthInput } from "./types/AuthInput";
import { List } from "../models/List";

@Resolver(of => User)
export class UserResolver implements ResolverInterface<User> {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
        @InjectRepository(List) private readonly listRepository: Repository<List>
     ) {}

    @Query(returns => [User]) //TODO: Make this require administrator authorization
    async allUsers(): Promise<User[]> {
        return this.userRepository.find()
    }
    
    @Query(returns => User)
    async findUserById(@Arg("userId") userId: string): Promise<User> {
        return this.userRepository.findOneOrFail({ id: userId })      
    }
    
    @Query(returns => User)
    async findUserByEmail(@Arg("userEmail") userEmail: string): Promise<User> {
        return this.userRepository.findOneOrFail({ email: userEmail })
    }
    
    @Query(returns => AuthToken)
    async loginUser(@Arg("loginData") loginData: AuthInput): Promise<AuthToken> {
        const user = await this.userRepository.findOneOrFail({ email: loginData.email })
        const validPassword = await bcrypt.compare(loginData.password, user.password)
        if (!validPassword) throw new Error("Invalid password.")
        return new AuthToken(user.generateAuthToken())
    }
    
    @Mutation(returns => AuthToken) // TODO: Look into how to do transactions
    async createUser(@Arg("userData") newUserData: UserInput): Promise<AuthToken> {
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        newUserData.password = await bcrypt.hash(newUserData.password, salt)
        
        // Generate User Object and set default Permission
        const user = this.userRepository.create(newUserData)
        const userSaveResponse = await this.userRepository.save(user)
        
        userSaveResponse.lists = await this.listRepository.save([
            this.listRepository.create({
                name: 'default_list', user: userSaveResponse
            })
        ])
        
        const defaultPermission = this.permissionRepository.create()
        defaultPermission.user = userSaveResponse
        await this.permissionRepository.save(defaultPermission)
        userSaveResponse.permissions = [ defaultPermission ]
        
        return new AuthToken(userSaveResponse.generateAuthToken())
    }
    
    @FieldResolver()
    async permissions(@Root() user: User): Promise<Permission[]> {
        return (await this.permissionRepository.find({user}))
    }
    
    @FieldResolver()
    dateofbirth(@Root() user: User): Date {
        // explicit date conversion required due to TypeORM hydration behavior with date type.
        return new Date(user.dateofbirth)
    }
}
