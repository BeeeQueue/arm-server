import { createSchema as S } from "ts-json-validator"

import { knex, Relation } from "@/db"
import { idSchema, Source, sourceSchema } from "@/schemas/common"

type BodyItem = {
  [key in Source]?: number
}

export const singularItemInputSchema = S({
  type: "object",
  propertyNames: sourceSchema,
  minProperties: 1,
  maxProperties: 4,
  additionalProperties: idSchema,
})

export type BodyQuery = BodyItem | BodyItem[]

const arrayInputSchema = S({
  type: "array",
  minItems: 1,
  maxItems: 100,
  items: singularItemInputSchema,
})

export const bodyInputSchema = S({
  oneOf: [singularItemInputSchema, arrayInputSchema],
})

export const bodyHandler = async (
  input: BodyQuery,
): Promise<BodyQuery extends Array<undefined> ? Array<Relation | null> : Relation> => {
  if (!Array.isArray(input)) {
    const relation = await knex.where(input).from("relations").first()

    return relation ?? null
  }

  let relations: Array<Relation | null> = []

  // Get relations
  relations = await knex
    .where(function () {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      for (const item of input) this.orWhere(item)
    })
    .from("relations")

  // Map them against the input, so we get results like [{item}, null, {item}]
  relations = input.map((item) => {
    const realItem = Object.entries(item)[0] as [Source, number]

    return relations.find((relation) => relation![realItem[0]] === realItem[1]) ?? null
  })

  return relations as any
}
