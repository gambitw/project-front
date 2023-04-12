export async function listCharacters() {
    const res = await fetch('https://rickandmortyapi.com/api/character')
    return res.json()
}

export async function getCharacter(id: number) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    return res.json()
}

export async function filterCharacters(formState: any) {
    // Remove valores vazios.
    Object.keys(formState).forEach(key => {
        if (formState[key] === '') {
          delete formState[key];
        }
    })
    
    const res = await fetch('https://rickandmortyapi.com/api/character/?' + new URLSearchParams(formState))
    return res.json()
}