import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import commentService from './service'

declare module 'fastify' {
    interface FastifyInstance {
        comments: {
            service: typeof commentService
        }
    }
}

const plugin: FastifyPluginAsync = async function (app) {
    app.decorate('comments', {
        service: commentService,
    })
}

export default fastifyPlugin(plugin)
