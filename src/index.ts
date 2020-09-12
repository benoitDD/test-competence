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

        app.log.error({ err })
        return process.exit(1)
    }

    app.articles.service
        .createArticle({ image: 'dfsgvfdsv', status: 'private', tags: ['fdg'], text: 'dsfgvdfg', title: 'fdsgdfg' })
        .then(() => console.log('done'))
        .catch((err) => console.log(err))
})
