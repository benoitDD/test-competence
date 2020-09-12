import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import userService from './service'

declare module 'fastify' {
    interface FastifyInstance {
        users: {
            service: typeof userService
        }
    }
}

const plugin: FastifyPluginAsync = async function (app) {
    app.decorate('users', {
        service: userService,
    })
}

export default fastifyPlugin(plugin)
