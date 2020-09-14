import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { schema } from './schema'
//import { root } from './root'
import GQL from 'fastify-gql'
import { Types } from 'mongoose'

const graphqlPlugins: FastifyPluginAsync = async function (app) {
    const resolvers = {
        Query: {},
        Mutation: {
            createArticle: app.articles.graphql.createArticle,
            signUp: app.users.graphql.signUp,
        },
        Article: app.articles.typeResolver,
    }

    app.register(GQL, {
        schema,
        resolvers,
        graphiql: 'playground',
        context: async (request, reply) => {
            // Return an object that will be available in your GraphQL resolvers
            return {
                //user: { id: new Types.ObjectId().toHexString() },
            }
        },
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