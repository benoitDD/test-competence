import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
//import { schema as schemaString } from './schema'
//import { root } from './root'
import GQL from 'fastify-gql'

const graphqlPlugins: FastifyPluginAsync = async function (app) {
    //const schema = buildSchema(schemaString)

    const schema = `
    type Query {
        add(x: Int, y: Int): Int
    }
    `
    const add: (nada: unknown, args: { x: number; y: number }) => Promise<number> = async (_, { x, y }) => x + y
    const resolvers = {
        Query: {
            add: add,
        },
    }

    app.register(GQL, {
        schema,
        resolvers,
        graphiql: true,
    })
}

export default fastifyPlugin(graphqlPlugins)
