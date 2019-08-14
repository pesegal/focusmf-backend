import {AuthChecker} from "type-graphql"
import config from "../config"
import jwt from "jsonwebtoken"
import _ from "lodash"

interface Context {
    authToken?: AuthToken
}

export interface AuthToken {
    id: string
    per: string[]
}

/**
 * Verifies a jwt and returns it's data
 * @param authToken jwt token
 */
export function getDataFromToken(authToken: string | undefined): AuthToken | undefined {
    if(authToken) {
        return jwt.verify(authToken, config.JWT_PRIVATE_KEY) as AuthToken
    }
}

/**
 * This function returns true/false if the user has the necessary authorization roles.
 * @param graphqlVars default graphql variables
 * @param roles a list of Authorization roles required to resolve
 */
export const tokenAuthorization: AuthChecker<Context> = ({ context }, roles) => {
    if (context.authToken) {
        if (roles.length === 0) {
            return true
        } else {
            return _.difference(roles, context.authToken.per).length === 0
        }
    }
    return false
}
