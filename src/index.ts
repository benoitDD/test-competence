import buildApp from './app'
import config from './config'

config.validate({ allowed: 'strict' })

const app = buildApp({
    logger: {
        level: 'info',
    },
})

app.listen(config.get('port'), async (err) => {
    if (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)

        app.log.error({ msg: `server no started cause: ${err.message}` })
        return process.exit(1)
    }
})
