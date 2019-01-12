import express from 'express'
const routes = express.Router()

routes.get('/', async (req, res) => {
    res.json({})
})

export default routes;