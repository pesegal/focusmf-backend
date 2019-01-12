import Joi from 'joi'

/**
 * Defines the User JSON structure for creating user accounts
 * and logging in.
 */
interface User {
    email: string
    password: string
    firstName?: string
    lastName?: string
    dateOfBirth?: string
}

const userSchema = {
    email: Joi.string().min(6).max(320).required().email(),
    password: Joi.string().min(8).max(50).required(),
    firstName: Joi.string().max(50),
    lastName: Joi.string().max(50),
    dateOfBirth: Joi.date()
}

export default function validate(user: User) {
    return Joi.validate(user, userSchema)
}