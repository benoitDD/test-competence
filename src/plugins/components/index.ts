import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import users from './users'
import articles from './articles'
import comments from './comments'

const plugins: FastifyPluginAsync = async function (app) {
    app.register(users)
    app.register(articles)
    app.register(comments)

    await app.sequelize.sync()
    app.log.info('database models are synchronized')
}

export default fastifyPlugin(plugins)
