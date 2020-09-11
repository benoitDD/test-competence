import { FastifyPluginAsync } from 'fastify'

interface Body {
    query: string
}

const graphqlRoute: FastifyPluginAsync = async function (app) {
    app.post<{
        Body: Body
    }>(
        '/graphql',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        query: { type: 'string' },
                    },
                    required: ['query'],
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            data: { type: 'object', additionalProperties: true },
                            errors: {
                                type: 'array',
                                items: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        async (request) => {
            return app.graphql.execute(request.body.query)
        },
    )
}

export default graphqlRoute
