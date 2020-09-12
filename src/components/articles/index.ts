import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import commentService from './service'

declare module 'fastify' {
    interface FastifyInstance {
        articles: {
            service: typeof commentService
        }
    }
}

const plugin: FastifyPluginAsync = async function (app) {
    app.decorate('articles', {
        service: commentService,
    })
}

export default fastifyPlugin(plugin)
