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
        console.log(err)
        app.log.error({ err })
        return process.exit(1)
    }
})
