import convict from 'convict'
import convictValidator from 'convict-format-with-validator'

convict.addFormat(convictValidator.ipaddress)

const schema = {
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    ip: {
        doc: 'The IP interface to listen.',
        format: 'ipaddress',
        default: '0.0.0.0',
        env: 'IP_ADDRESS',
    },
    port: {
        doc: 'The server port to listen.',
        format: 'port',
        default: 8080,
        env: 'PORT',
    },
    database: {
        uri: {
            doc: 'The database uri.',
            format: String,
            default: 'mongodb://192.168.99.100/myApp',
            env: 'DATABASE_URI',
        },
    },
    userAuthentication: {
        secretKey: {
            doc: 'The secret key for create and read the authentication tokens of users.',
            format: String,
            default: 'YOUR_SECRET_TOKEN',
            env: 'SECRET_KEY_FOR_TOKENS_AUTH',
            arg: 'skta',
        },
        expireIn: {
            doc: 'The secret key expire in x seconds.',
            format: 'nat',
            default: 60 * 60 * 5, //the token expire in 5 hours.
            env: 'EXPIRE_FOR_TOKENS_AUTH',
            arg: 'ekta',
        },
    },
}

export interface ConfigI {
    env: string
    ip: string
    port: number
    database: {
        uri: string
    }
    userAuthentication: {
        secretKey: string
        expireIn: number
    }
}

const config = convict<ConfigI>(schema)

export default config
