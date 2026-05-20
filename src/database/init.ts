import {db} from './sqlite'

export function initDatabase() {
    db.runSync(
        `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
        `
    )
    db.runSync(
        `
            CREATE TABLE IF NOT EXISTS pokemon_sightings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pokemon_id INT NOT NULL,
                location TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `
    )
}