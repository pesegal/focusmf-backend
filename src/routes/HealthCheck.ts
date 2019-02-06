import express from 'express'
const routes = express.Router()

/**
 * Returns the health status of the service.
 */
routes.get('/', async (req, res) => {
    res.json({status: 'UP'})
})

export default routes;