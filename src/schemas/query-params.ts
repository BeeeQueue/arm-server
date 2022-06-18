import { JSONSchema7 } from "json-schema"

import { knex } from "@/db"
import { idSchema, Source, sourceSchema } from "@/schemas/common"

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

export const handleQueryParams = async (input: QueryParamQuery) => {
  return knex
    .where({ [input.source]: input.id })
    .from("relations")
    .first()
}
