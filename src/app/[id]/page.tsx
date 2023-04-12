"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

import { getCharacter, getEpisode } from "@/services"

import { Character } from "@/interfaces/character"
import CardEpisode from "@/components/cardEpisode"
import { Episode } from "@/interfaces/episode"

export default function Single({ params }: { params: any }) {
    const [character, setCharacter] = useState<Character>()
    const [episodes, setEpisodes] = useState<Episode[]>()

    useEffect(() => {
        async function load () {
            const data: Character = await getCharacter(params.id)
            setCharacter(data)
            const listEpisodeID = data?.episode?.map(item => parseFloat(item.replace('https://rickandmortyapi.com/api/episode/', '')))
            const episodesResult = listEpisodeID && await getEpisode(listEpisodeID)
            console.log('episodesResult', episodesResult)
            setEpisodes(episodesResult)
        }
        load()
    }, [])


    return (
        <main className="max-w-6xl mx-auto mt-12">
            <div className="flex flex-row items-center space-x-3">
                <Link href="/">
                    <svg className="h-8" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24">
                        <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                    </svg>
                </Link>
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
                    {character?.name}
                </h1>
            </div>
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3 border-t-4 border-green-400">
                            <div className="image overflow-hidden">
                                <img className="h-auto w-full mx-auto" src={character?.image} alt={character?.name} />
                            </div>
                            <div className="text-center">
                                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                                    #{character?.id} - {character?.name}
                                </h1>
                                <h3 className="uppercase text-sm text-slate-500 font-semibold">
                                    {character?.species}
                                </h3>
                            </div>
                            <ul className="bg-slate-50 text-gray-600 hover:text-gray-700 py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span className="uppercase text-xs font-bold">
                                        Status
                                    </span>
                                    <span className="ml-auto">
                                        {character?.status}
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span className="uppercase text-xs font-bold">
                                        Genero
                                    </span>
                                    <span className="ml-auto">
                                        {character?.gender}
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span className="uppercase text-xs font-bold">
                                        Localização
                                    </span>
                                    <span className="ml-auto text-right">
                                        {character?.location?.name}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-9/12 mx-2 h-64">
                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span className="text-green-500">
                                    <svg className="h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM9.536 9 6.869 5h2.596l2.667 4H9.536zm5 0-2.667-4h2.596l2.667 4h-2.596zM4 5h.465l2.667 4H4V5zm0 14v-8h16l.002 8H4z"></path>
                                        <path d="m10 18 5.5-3-5.5-3z"></path>
                                    </svg>
                                </span>
                                <span className="tracking-wide">Episódios ({episodes ? episodes.length : 0})</span>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {episodes?.length && episodes.map((item, index) => <CardEpisode key={index} {...item} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
