import buildApp from './app'
import { MongoMemoryServer } from 'mongodb-memory-server'
import os from 'os'
import config from './config'

const platorm = os.platform()

let version //this version work on my window :-)
if (platorm === 'win32') version = '3.5.5'

const mongod = new MongoMemoryServer({
    binary: {
        version,
    },
})

beforeAll(async (done) => {
    try {
        const uri = await mongod.getUri()
        config.set('database.uri', uri)
        done()
    } catch (err) {
        done(err)
    }
})

describe('tests', () => {
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
                const login = 'benoit'
                const email = `${login}@gmail.com`
                const avatar = 'myavatar.png'
                const response = await app.inject({
                    method: 'POST',
                    url: '/graphql',
                    payload: {
                        query: `
                        mutation {
                            signUp(login: "${login}", password: "deeesss", email: "${email}", avatar: "${avatar}") 
                                {id login email avatar token}
                        }`,
                    },
                })

                const body = JSON.parse(response.body)
                expect(body).toMatchObject({
                    data: {
                        signUp: {
                            login,
                            email,
                            avatar,
                        },
                    },
                })

                expect(typeof body.data.signUp.id).toBe('string')
                expect(typeof body.data.signUp.token).toBe('string')
            })

            //to continued ... (bad sign up, ...)
        })

        //to continued ...
    })

    afterAll(async (done) => {
        await app.close()

        done()
    })
})

afterAll(async (done) => {
    await mongod.stop()
    done()
})
