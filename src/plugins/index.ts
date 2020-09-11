import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import sequelize from './sequelize'
import config from './config'
//import components from './components'
import graphql from './graphql'

const plugins: FastifyPluginAsync = async function (app) {
    app.register(config)
    app.register(sequelize)
    //app.register(components)
    app.register(graphql)
}

export default fastifyPlugin(plugins)
