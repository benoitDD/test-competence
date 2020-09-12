import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

declare module 'fastify' {
    interface FastifyInstance {
        comments: {
            createComment: () => void
        }
    }
}

const plugin: FastifyPluginAsync = async function (app) {
    app.decorate('comments', {
        createUser: () => {
            console.log('comment created')
        },
    })
}

export default fastifyPlugin(plugin)
