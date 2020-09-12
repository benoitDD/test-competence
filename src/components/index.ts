import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import users from './users'
import articles from './articles'
import comments from './comments'

const plugins: FastifyPluginAsync = async function (app) {
    app.register(users)
    app.register(articles)
    app.register(comments)
}

export default fastifyPlugin(plugins)
