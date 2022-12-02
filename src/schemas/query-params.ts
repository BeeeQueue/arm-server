import { JSONSchema7 } from "json-schema"

import { knex } from "@/db"
import { idSchema, Source, sourceSchema } from "@/schemas/common"
import { FastifyReply, FastifyRequest } from "fastify"

export type QueryParamQuery = {
  source: Source
  id: number
}

export const queryInputSchema: JSONSchema7 = {
  type: "object",
  properties: {
    source: sourceSchema,
    id: idSchema,
  },
  required: ["source", "id"],
}

export const handleQueryParams = async (
  request: FastifyRequest<{ Querystring: QueryParamQuery }>,
  reply: FastifyReply,
) => {
  const data = await knex
    .where({ [request.query.source]: request.query.id })
    .from("relations")
    .first()

  void reply.header("Cache-Control", "public,max-age=10800")

  return data
}
