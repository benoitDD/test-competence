import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { User, userSchema } from './model'
import { Article } from '../articles/model'

declare module 'fastify' {
    interface FastifyInstance {
        model: User
    }
}

const plugin: FastifyPluginAsync = async function (app) {
    User.init(userSchema, {
        tableName: 'user',
        sequelize: app.sequelize, // passing the `sequelize` instance is required
    })
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    User.hasMany(Article)

    app.decorate('user', {
        model: User,
    })
}

export default fastifyPlugin(plugin)
