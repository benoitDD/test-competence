import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
//import { schema } from './schema'
//import { root } from './root'
import GQL from 'fastify-gql'

const graphqlPlugins: FastifyPluginAsync = async function (app) {
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

    //add the tags in swagger for graphql.
    app.ready((err) => {
        if (err) return

        const paths = app.swagger().paths
        Object.keys(paths)
            .filter((path) => path.startsWith('/graphql') || path.startsWith('/graphiql'))
            .forEach((path) => {
                const objectPath = paths[path as string]
                if (objectPath.get) objectPath.get.tags = ['graphql']

                if (objectPath.post) objectPath.post.tags = ['graphql']
            })
    })
}

export default fastifyPlugin(graphqlPlugins)
