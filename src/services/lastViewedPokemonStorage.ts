import AsyncStorage from '@react-native-async-storage/async-storage';


const FAVORITES_KEY = '@mypokedex/lastViewedPokemon';


export type LastViewedPokemon = {
 id: number;
 name: string;
 imageUrl: string;
 types: string[];
 savedAt: string;
};


export async function getLastViewedPokemon(): Promise<LastViewedPokemon[]> {
 const raw = await AsyncStorage.getItem(FAVORITES_KEY);
 console.log(raw)
 if (!raw) return [];
 return JSON.parse(raw) as LastViewedPokemon[];
}

export async function setLastViewedPokemon(pokemon: Omit<LastViewedPokemon, 'savedAt'>) {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(
    {...pokemon, savedAt: new Date().toISOString()}
  ));
  return pokemon;
}


// export async function getFavoriteIds(): Promise<number[]> {
//  const favorites = await getLastViewedPokemons();
//  return favorites.map((pokemon) => pokemon.id);
// }


// export async function isFavorite(id: number): Promise<boolean> {
//  const favorites = await getLastViewedPokemons();
//  return favorites.some((pokemon) => pokemon.id === id);
// }


// export async function toggleFavorite(pokemon: Omit<LastViewedPokemon, 'savedAt'>): Promise<LastViewedPokemon[]> {
//  const favorites = await getLastViewedPokemons();
//  const exists = favorites.some((item) => item.id === pokemon.id);


//  const updated = exists
//    ? favorites.filter((item) => item.id !== pokemon.id)
//    : [...favorites, { ...pokemon, savedAt: new Date().toISOString() }];


//  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
//  return updated;
// }

// export async function clearFavorites(): Promise<void> {
//  await AsyncStorage.removeItem(FAVORITES_KEY);
// }
