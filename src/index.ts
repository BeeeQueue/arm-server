import Koa, { Context } from 'koa'
import BodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { init, captureException } from '@sentry/node'

import { routes } from './routes'

const { NODE_ENV } = process.env
const port = process.env.PORT || 3000
const app = new Koa()
const router = new Router()

init({
  dsn: 'https://a1c2b4d9841046bd9d7d154c9a6be149@sentry.io/1380324',
  enabled: NODE_ENV === 'production',
})

app.use(BodyParser())

router.get('/', (ctx: Context) => {
  ctx.body = `
Usage:
GET /api/ids?source={anilist|anidb|myanimelist|kitsu}&id={number}

Returns:
{
  something  
}
`
})

router.use(routes)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

app.on('error', err => {
  captureException(err)
})
