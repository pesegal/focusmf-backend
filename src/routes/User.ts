import express from 'express'
import validateUser from '../models/validators/UserSchema'
import { User } from '../models/entity/User'
import App from './App'
import { getRepository } from 'typeorm';

const routes = express.Router()
const userRepository = App.co
getRepository(User)

routes.get('/', async (req, res) => {
    res.json({})
})

routes.post('/', async (req, res) => {
    const { error, value } = validateUser(req.body)
    if (error) return res.status(400).send(error);

    // const user = userRepository.create({
    //     email: value.email,
    //     password: value.password,
    //     first_name: value.firstName,
    //     last_name: value.lastName,
    //     dateofbirth: value.dateOfBirth        
    // })

    // await userRepository.save(user)

    res.send({})

    // let user = await User.findOne({ email: req.body.email });
    // if (user) return res.status(400).send('User already registered.')

    // user = new User(_.pick(req.body, ['name', 'email', 'password']));
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);

    // await user.save();

    // const token = user.generateAuthToken();
    // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
})

export default routes;