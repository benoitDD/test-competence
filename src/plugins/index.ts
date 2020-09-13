import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import mongoose from './mongoose'
import config from './config'
import graphql from './graphql'
import swagger from 'fastify-swagger'

const plugins: FastifyPluginAsync = async function (app) {
    app.register(config)
    app.register(mongoose)
    app.register(swagger, {
        routePrefix: '/documentation',
        swagger: {
            info: {
                title: 'My application',
                description: 'the swagger api',
                version: '0.1.0',
            },
        },
        exposeRoute: true,
    })
    app.register(graphql)
}

export default fastifyPlugin(plugins)
