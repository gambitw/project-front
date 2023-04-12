"use client"
import { useEffect, useState } from "react"
import { listCharacters } from "@/services"
import { CharacterList, Character } from "@/interfaces/character"

import Card from "@/components/card"
import Filter from "@/components/filter"

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>()

  useEffect(() => {
    async function init () {
      const data: CharacterList = await listCharacters()
      const { results } = data
      setCharacters(results)
    }
    init()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
      <div className="text-center pb-12">
        <h1 className="font-bold text-4xl font-heading text-gray-900">
          Personagens Ricky Morty
        </h1>
        <Filter filter={(item?: Character[]) => item && setCharacters(item)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters?.map((item: Character, index) => <Card key={index} {...item} /> )}
      </div>
    </div>
  )
}
