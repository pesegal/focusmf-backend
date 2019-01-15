import express from 'express'
import validateUser from '../models/validators/UserSchema'
import { User } from '../models/entity/User'
import { getRepository } from 'typeorm'
import bcrypt from 'bcrypt'
import App from '../App'
import _ from 'lodash'

export default () => {
    const logger = App.logger
    const routes = express.Router()
    const userRepository = getRepository(User)

    routes.get('/', async (req, res) => {
        res.json({})
    })
    
    routes.post('/', async (req, res) => {
        const { error, value } = validateUser(req.body)
        if (error) return res.status(400).send(error);

        // Salt and hash the password      

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
            res.send(_.pick(response, ["id", "email", "verified"]))
        } catch (error) {
            // This will return an error when entity constraints are violated.
            logger.warn(error.message)
            res.status(409).send(error.detail)
        }
        
        // const token = user.generateAuthToken();
        // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    })
    return routes
}