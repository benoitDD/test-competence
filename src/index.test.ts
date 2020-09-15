import buildApp from './app'

const app = buildApp()

describe('test healtcheck route', () => {
    test('without params, should be OK', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/healthcheck',
        })

        expect(response.body).toBe('OK')
    })
})
describe('api graphql', () => {
    describe('authentication', () => {
        test('sign up with good params, should be OK', async () => {
            const randomLogin = Math.random().toString(36).substring(7)
            const randomEmail = `${randomLogin}@gmail.com`
            const response = await app.inject({
                method: 'POST',
                url: '/graphql',
                payload: {
                    query: `mutation {signUp(login: "${randomLogin}", password: "deeesss", email: "${randomEmail}", avatar: "myavatar.png") {id login email avatar token}}`,
                },
            })

            const body = JSON.parse(response.body)
            expect(body).toMatchObject({
                data: {
                    signUp: {
                        login: randomLogin,
                        email: randomEmail,
                        avatar: 'myavatar.png',
                    },
                },
            })

            expect(typeof body.data.signUp.id).toBe('string')
            expect(typeof body.data.signUp.token).toBe('string')
        })

        //to continued ... (bad sign up)
    })

    //to continued ...
})

afterAll(() => {
    app.close()
})
