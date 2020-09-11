import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { Config } from 'convict'
import config, { ConfigI } from '../config'

declare module 'fastify' {
    interface FastifyInstance {
        config: Config<ConfigI>
    }
}

const configPlugin: FastifyPluginAsync = async function (app) {
    app.decorate('config', config)
}

export default fastifyPlugin(configPlugin)
