import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import userService from './service'
import userGraphql from './graphql'
import { init as initModel } from './model'

declare module 'fastify' {
    interface FastifyInstance {
        users: {
            service: typeof userService
            graphql: typeof userGraphql
        }
    }
}

const plugin: FastifyPluginAsync = async function (app) {
    await initModel()

    app.decorate('users', {
        service: userService,
        graphql: userGraphql,
    })
}

export default fastifyPlugin(plugin)
