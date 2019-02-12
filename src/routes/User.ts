import express from 'express'
import validateUser from '../models/validators/UserSchema'
import { User } from '../models/entity/User'
import { getRepository } from 'typeorm'
import { Permission } from '../models/entity/Permission'
import auth from '../middleware/auth'
import bcrypt from 'bcrypt'
import App from '../App'
import _ from 'lodash'


export default () => {
    const logger = App.logger
    const routes = express.Router()
    const userRepository = getRepository(User)
    const permissionRepository = getRepository(Permission)

    /**
     * Get current users information.
     */
    routes.get('/', auth, async (req, res) => {
        const user = await userRepository.findOne({ id: res.locals.authData.id })
        res.send(_.pick(user, ['id', 'email', 'first_name', 'last_name', 'dateofbirth']))
    })
    
    /**
     * Create a new user account in the system 
     */
    routes.post('/', async (req, res) => {
        const { error, value } = validateUser(req.body)
        if (error) return res.status(400).send({ errorMsg: `${error.message}` });

        const user = userRepository.create({
            email: value.email,
            password: value.password,
            first_name: value.firstName,
            last_name: value.lastName,
            dateofbirth: value.dateOfBirth        
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
        try {
            const response = await userRepository.save(user)
            // Set default permission for user.
            const defaultPermission = new Permission()
            defaultPermission.user = response
            await permissionRepository.save(defaultPermission)
            response.permissions = [defaultPermission]
            const token = response.generateAuthToken()
            res.header('x-auth-token', token).send(_.pick(response, ["id", "email", "verified"]))
        } catch (error) {
            logger.warn(error.message)
            res.status(409).send({ errorMsg: error.detail })
        }
        
    })
    return routes
}