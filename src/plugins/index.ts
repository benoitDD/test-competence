import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import mongoose from './mongoose'
import config from './config'
import graphql from './graphql'

const plugins: FastifyPluginAsync = async function (app) {
    app.register(config)
    app.register(mongoose)
    app.register(graphql)
}

export default fastifyPlugin(plugins)
