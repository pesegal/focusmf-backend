import express from 'express'
import App from '../App'
import { User } from '../models/entity/User'
import validate from '../models/validators/UserSchema'
import bcrypt from 'bcrypt'
import { getRepository } from 'typeorm';

export default () => {
    const logger = App.logger
    const routes = express.Router()
    const userRepository = getRepository(User)

    /**
     *  Login route, checks first to see if the user exists then checks if the user's password is valid
     *  if both are true then returns a JSON with the auth JWT token.
     */
    routes.post('/', async (req, res) => {
        const { error, value } = validate(req.body)
        if (error) return res.status(400).send(error)
        try {
            const user = await userRepository.findOneOrFail({ email: value.email })
            const validPassword = await bcrypt.compare(value.password, user.password)
            if (!validPassword) throw new Error("User submitted invalid password.")
            res.send({ authToken: user.generateAuthToken() })
        } catch (error) {
            logger.debug(`Login Failure: ${error}`)
            res.status(400).send({ errorMsg: "Invalid Username or Password."})
        }
    })  
    return routes
}