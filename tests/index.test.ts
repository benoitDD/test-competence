import buildApp from '../src/app'
import { MongoMemoryServer } from 'mongodb-memory-server'
import os from 'os'
import config from '../src/config'

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
    describe('healtcheck route', () => {
        test('without params, should be OK', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/healthcheck',
            })

            expect(response.body).toBe('OK')
        })
    })
    describe('graphql api', () => {
        const login = 'benoit'
        let avatar = 'myavatar.png'
        const email = `${login}@gmail.com`
        const password = 'myPassword'
        let token: string

        describe('authentication', () => {
            test('sign up without email, should be KO', async () => {
                const response = await app.inject({
                    method: 'POST',
                    url: '/graphql',
                    payload: {
                        query: `
                        mutation {
                            signUp(login: "${login}", password: "${password}", avatar: "${avatar}") 
                                {id login email avatar token}
                        }`,
                    },
                })

                const body = JSON.parse(response.body)
                expect(body).toMatchObject({
                    data: null,
                    errors: [
                        {
                            message:
                                'Field "signUp" argument "email" of type "String!" is required, but it was not provided.',
                        },
                    ],
                })
            })

            test('sign up with good params, should be OK', async () => {
                const response = await app.inject({
                    method: 'POST',
                    url: '/graphql',
                    payload: {
                        query: `
                        mutation {
                            signUp(login: "${login}", password: "${password}", email: "${email}", avatar: "${avatar}") 
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

            test('re-sign up with same login, should be KO', async () => {
                const response = await app.inject({
                    method: 'POST',
                    url: '/graphql',
                    payload: {
                        query: `
                        mutation {
                            signUp(login: "${login}", password: "${password}", email: "${email}", avatar: "${avatar}") 
                                {id login email avatar token}
                        }`,
                    },
                })

                const body = JSON.parse(response.body)
                expect(body).toMatchObject({
                    data: {
                        signUp: null,
                    },
                    errors: [
                        {
                            message: 'E11000 duplicate key error dup key: { : "benoit@gmail.com" }',
                        },
                    ],
                })
            })

            test('sign in with same params that sign up, should be OK', async () => {
                const response = await app.inject({
                    method: 'POST',
                    url: '/graphql',
                    payload: {
                        query: `
                        mutation {
                            signIn(login: "${login}", password: "${password}") 
                                {id login email avatar token}
                        }`,
                    },
                })

                const body = JSON.parse(response.body)
                expect(body).toMatchObject({
                    data: {
                        signIn: {
                            login,
                            email,
                            avatar,
                        },
                    },
                })

                expect(typeof body.data.signIn.id).toBe('string')
                expect(typeof body.data.signIn.token).toBe('string')

                token = body.data.signIn.token
            })

            test('sign in with bad password, should be KO', async () => {
                const response = await app.inject({
                    method: 'POST',
                    url: '/graphql',
                    payload: {
                        query: `
                        mutation {
                            signIn(login: "${login}", password: "unknow password") 
                                {id login email avatar token}
                        }`,
                    },
                })

                const body = JSON.parse(response.body)
                expect(body).toMatchObject({
                    data: {
                        signIn: null,
                    },
                    errors: [
                        {
                            message: 'no user finded for this login or password.',
                        },
                    ],
                })
            })
        })

        describe('user', () => {
            test('update user avatar with good auth, should be OK', async () => {
                const newAvatar = 'toto.png'
                const response = await app.inject({
                    method: 'POST',
                    url: '/graphql',
                    payload: {
                        query: `
                        mutation {
                            updateUser(avatar: "${newAvatar}") 
                                {id login email avatar}
                        }`,
                    },
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                })

                const body = JSON.parse(response.body)
                expect(body).toMatchObject({
                    data: {
                        updateUser: {
                            login,
                            email,
                            avatar: newAvatar,
                        },
                    },
                })

                avatar = newAvatar

                expect(typeof body.data.updateUser.id).toBe('string')
            })

            test('update user avatar without auth, should be KO', async () => {
                const newAvatar = 'titi.png'
                const response = await app.inject({
                    method: 'POST',
                    url: '/graphql',
                    payload: {
                        query: `
                        mutation {
                            updateUser(avatar: "${newAvatar}") 
                                {id login email avatar}
                        }`,
                    },
                })

                const body = JSON.parse(response.body)
                expect(body).toMatchObject({
                    data: {
                        updateUser: null,
                    },
                    errors: [
                        {
                            message: 'you must be connected to update a user',
                        },
                    ],
                })
            })
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
