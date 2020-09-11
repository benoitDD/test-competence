import buildApp from '../app'

describe('test healtcheck route', () => {
    const app = buildApp()
    test('without params, should be OK', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/healthcheck',
        })

        expect(response.body).toBe('OK')
    })

    afterAll(() => {
        app.close()
    })
})
