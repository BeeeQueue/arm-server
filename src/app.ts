import Fastify from "fastify"
import Helmet from "fastify-helmet"
import { customAlphabet, urlAlphabet } from "nanoid"

import { config } from "@/config"
import { sendErrorToSentry } from "@/lib/sentry"
import { apiPlugin } from "@/routes/ids"

import pkgJson from "../package.json"

const isProd = config.NODE_ENV === "production"

const nanoid = customAlphabet(urlAlphabet, 16)

export const buildApp = async () => {
  const App = Fastify({
    ignoreTrailingSlash: true,
    onProtoPoisoning: "remove",
    onConstructorPoisoning: "remove",
    trustProxy: isProd,
    genReqId: nanoid,
    logger: {
      level: config.LOG_LEVEL,
      prettyPrint: !isProd,
    },
  })

  await App.register(Helmet, {
    hsts: isProd,
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })

  App.addHook("onError", (request, _reply, error, next) => {
    sendErrorToSentry(error, request as any)

    next()
  })

  await App.register(apiPlugin, { prefix: "/api" })

  App.get("/", async (_request, reply) => reply.redirect(301, pkgJson.homepage))

  return App
}
