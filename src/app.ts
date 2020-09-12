import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import routes from './routes'
import plugins from './plugins'
import helmet from 'fastify-helmet'
import components from './components'

function buildApp(opts: FastifyServerOptions = {}): FastifyInstance {
    const app = fastify(opts)

    app.register(plugins)
    app.register(helmet)
    app.register(routes)
    app.register(components)

    app.setErrorHandler((err, request, reply) => {
        if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
            app.log.warn({ err })
            reply.code(err.statusCode).send(err.message)
        } else if (err.validation) {
            app.log.warn({ err })
            reply.code(400).send(err.message)
        } else {
            app.log.error({ err })
            reply.code(500).send('internal error')
        }
    })

    app.setNotFoundHandler((request, reply) => {
        app.log.warn(`route not handle ${request.method} ${request.routerPath}`)
        reply.code(404).send('not found')
    })

    return app
}

export default buildApp
