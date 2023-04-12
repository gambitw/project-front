import { Episode } from "./episode"

interface Infos {
  name: string
  url: string
}

interface CharacterListInfos {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Infos
  location: Infos
  image: string
  episode: string[]
  url: string
  created: string
}

export interface CharacterList {
  info: CharacterListInfos
  results: Character[]
}