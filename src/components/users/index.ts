import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

declare module 'fastify' {
    interface FastifyInstance {
        users: {
            createUser: () => void
        }
    }
}

const plugin: FastifyPluginAsync = async function (app) {
    app.decorate('users', {
        createUser: () => {
            console.log('user created')
        },
    })
}

export default fastifyPlugin(plugin)
