import { enumToArray } from '@/utils'
import Joi from 'joi'

export enum Source {
  AniList = 'anilist',
  AniDB = 'anidb',
  MAL = 'myanimelist',
  Kitsu = 'kitsu',
}

export const sourceArray = (enumToArray(Source) as unknown) as string[]

export const idSchema = Joi.number()
  .min(0)
  .max(2147483647)
  .precision(0)
  .required()