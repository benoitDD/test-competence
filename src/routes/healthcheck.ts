import { FastifyPluginAsync } from 'fastify'

const healthcheckRoute: FastifyPluginAsync = async function (app) {
    app.get('/healthcheck', {}, (request, response) => {
        response.send('OK')
    })
}

export default healthcheckRoute
