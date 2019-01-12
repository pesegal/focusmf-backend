import express from 'express'
const routes = express.Router()

routes.get('/', async (req, res) => {
    res.json({status: 'UP'})
})

export default routes;