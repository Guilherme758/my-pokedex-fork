import { db } from '../database/sqlite'

type PokemonSightingRow = {
    pokemon_id: number,
    location: string,
    created_at: string,
}

export function getPokemonSightings(): Array<PokemonSightingRow> {
    const rows = db.getAllSync<PokemonSightingRow>(
        "SELECT * FROM pokemon_sightings"
    )

    return rows
}

export function insertPokemonSightings(pokemon_id: number, location: string): void {
    db.runSync(
        `
        INSERT INTO pokemon_sightings (pokemon_id, location)
        VALUES (?, ?)
        `,
        [pokemon_id, location]
    )
}