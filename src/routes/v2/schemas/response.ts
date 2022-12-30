import { JSONSchema7 } from "json-schema"

import {
  makeNullable,
  numberIdSchema,
  stringIdSchema,
  imdbIdSchema,
} from "@/shared-schemas"

const nullableNumberIdSchema = makeNullable(numberIdSchema)
const nullableStringIdSchema = makeNullable(stringIdSchema)
const nullableImdbIdSchema = makeNullable(imdbIdSchema)

export const responseItemSchema: JSONSchema7 = {
  type: "object",
  additionalProperties: false,
  properties: {
    anidb: nullableNumberIdSchema,
    anilist: nullableNumberIdSchema,
    "anime-planet": nullableStringIdSchema,
    anisearch: nullableNumberIdSchema,
    imdb: nullableImdbIdSchema,
    kitsu: nullableNumberIdSchema,
    livechart: nullableNumberIdSchema,
    "notify-moe": nullableStringIdSchema,
    themoviedb: nullableNumberIdSchema,
    thetvdb: nullableNumberIdSchema,
    myanimelist: nullableNumberIdSchema,
  },
}

const responseArraySchema: JSONSchema7 = {
  type: "array",
  items: makeNullable(responseItemSchema),
}

export const responseBodySchema: JSONSchema7 = makeNullable(
  responseItemSchema,
  responseArraySchema,
)
