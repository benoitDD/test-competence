import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { Comment, commentSchema } from './model'

const plugin: FastifyPluginAsync = async function (app) {
    Comment.init(commentSchema, {
        tableName: 'comment',
        sequelize: app.sequelize, // passing the `sequelize` instance is required
    })

    app.decorate('comment', {})
}

export default fastifyPlugin(plugin)
