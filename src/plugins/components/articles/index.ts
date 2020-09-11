import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { Article, articleSchema } from './model'
import { Comment } from '../comments/model'

const plugin: FastifyPluginAsync = async function (app) {
    Article.init(articleSchema, {
        tableName: 'article',
        sequelize: app.sequelize, // passing the `sequelize` instance is required
    })

    // Here we associate which actually populates out pre-declared `association` static and other methods.
    Article.hasMany(Comment)

    app.decorate('article', {})
}

export default fastifyPlugin(plugin)
