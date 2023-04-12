export async function getEpisode(ids: number[]) {
    const res = await fetch(`https://rickandmortyapi.com/api/episode/${ids}`)
    const result = await res.json()
    return result.length ? result : [result]
}