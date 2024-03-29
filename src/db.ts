import Knex from "knex"

import knexfile from "../knexfile"

declare module "knex/types/tables" {
  /* eslint-disable @typescript-eslint/consistent-type-definitions */
  interface Tables {
    relations: Relation
  }
}

export const knex = Knex(knexfile)

export enum Source {
  AniDB = "anidb",
  AniList = "anilist",
  AnimePlanet = "anime-planet",
  AniSearch = "anisearch",
  IMDB = "imdb",
  Kitsu = "kitsu",
  LiveChart = "livechart",
  NotifyMoe = "notify-moe",
  TheMovieDB = "themoviedb",
  TheTVDB = "thetvdb",
  MAL = "myanimelist",
}

export type Relation = {
  [Source.AniDB]?: number
  [Source.AniList]?: number
  [Source.AnimePlanet]?: string
  [Source.AniSearch]?: number
  [Source.IMDB]?: `tt${string}`
  [Source.Kitsu]?: number
  [Source.LiveChart]?: number
  [Source.NotifyMoe]?: string
  [Source.TheMovieDB]?: number
  [Source.TheTVDB]?: number
  [Source.MAL]?: number
}
