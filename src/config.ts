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
}

export interface ConfigI {
    env: string
    ip: string
    port: number
    database: {
        uri: string
    }
}

const config = convict<ConfigI>(schema)

export default config
