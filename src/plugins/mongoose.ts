import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import mongoose, { Mongoose } from 'mongoose'

declare module 'fastify' {
    interface FastifyInstance {
        mongoose: Mongoose
    }
}

const mongoosePlugins: FastifyPluginAsync = async function (app) {
    mongoose.connect(app.config.get('database').uri, {
        useNewUrlParser: true,
        autoIndex: app.config.get('env') === 'development',
        useUnifiedTopology: true,
    })

    app.decorate('mongoose', mongoose)

    const loggerDatabase = app.log.child({ from: 'mongoose' })

    const db = mongoose.connection
    db.on('error', (err) => loggerDatabase.error({ err }))
    db.on('connected', () => loggerDatabase.info('connected to database'))
    db.on('disconnected', () => loggerDatabase.warn('disconnected to database'))

    app.addHook('onClose', () => {
        db.close()
    })

    return new Promise((resolve) => {
        db.once('open', function () {
            resolve()
        })
    })
}

export default fastifyPlugin(mongoosePlugins)
