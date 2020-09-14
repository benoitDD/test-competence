import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import commentService from './service'
import commentGraphql from './graphql'
import { typeResolver } from './graphql'

declare module 'fastify' {
    interface FastifyInstance {
        comments: {
            service: typeof commentService
            graphql: typeof commentGraphql
            typeResolver: typeof typeResolver
        }
    }
}

const plugin: FastifyPluginAsync = async function (app) {
    app.decorate('comments', {
        service: commentService,
        graphql: commentGraphql,
        typeResolver: typeResolver,
    })
}

export default fastifyPlugin(plugin)
