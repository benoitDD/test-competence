import { FastifyPluginAsync } from 'fastify'

const healthcheckRoute: FastifyPluginAsync = async function (app) {
    app.get(
        '/healthcheck',
        {
            schema: {
                tags: ['AWS'],
            },
        },
        (request, response) => {
            response.send('OK')
        },
    )
}

export default healthcheckRoute
