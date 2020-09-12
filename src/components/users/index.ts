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
    app.decorate('user', {
        model: User,
    })
}

export default fastifyPlugin(plugin)
