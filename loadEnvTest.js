// eslint-disable-next-line @typescript-eslint/no-var-requires
let res = require('dotenv').config({
    path: 'env/.env-test',
})

if (res.error) throw res.error
