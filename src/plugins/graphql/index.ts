import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { schema as schemaString } from './schema'
import { graphql, buildSchema } from 'graphql'
import { root } from './root'

declare module 'fastify' {
    interface FastifyInstance {
        graphql: {
            execute: (query: string) => ReturnType<typeof graphql>
        }
    }
}

const graphqlPlugins: FastifyPluginAsync = async function (app) {
    const schema = buildSchema(schemaString)

    function execute(query: string) {
        return graphql(schema, query, root)
    }

    app.decorate('graphql', {
        execute,
    })
}

export default fastifyPlugin(graphqlPlugins)
