import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { Sequelize } from 'sequelize'

declare module 'fastify' {
    interface FastifyInstance {
        sequelize: Sequelize
    }
}

const sequelizePlugins: FastifyPluginAsync = async function (app) {
    const sequelize = new Sequelize(app.config.get('database').uri, {
        logging: (message) => app.log.info(`database log: ${message}`),
    })

    //may throw a error
    await sequelize.authenticate()
    app.log.info('connected to database')

    app.decorate('sequelize', sequelize)
}

export default fastifyPlugin(sequelizePlugins)
