import { FastifyPluginAsync } from 'fastify'
import healthcheckRoute from './healthcheck'
import graphqlRoute from './graphql'

const routes: FastifyPluginAsync = async function (app) {
    app.register(healthcheckRoute)
    app.register(graphqlRoute)
}

export default routes
