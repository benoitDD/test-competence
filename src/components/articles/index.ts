import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import articleService from './service'
import articleGraphql, { typeResolver } from './graphql'

declare module 'fastify' {
    interface FastifyInstance {
        articles: {
            service: typeof articleService
            graphql: typeof articleGraphql
            typeResolver: typeof typeResolver
        }
    }
}

const plugin: FastifyPluginAsync = async function (app) {
    app.decorate('articles', {
        service: articleService,
        graphql: articleGraphql,
        typeResolver,
    })
}

export default fastifyPlugin(plugin)
