import { FastifyPluginAsync } from 'fastify'
import healthcheckRoute from './healthcheck'

const routes: FastifyPluginAsync = async function (app) {
    app.register(healthcheckRoute)
}

export default routes
