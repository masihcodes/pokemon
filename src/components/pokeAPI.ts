"use server";

import { PokemonCardType, PokemonDetails, PokemonListItem } from './types';



export async function getAllPokemon(): Promise<PokemonListItem[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1340", { cache: "force-cache" })
  if (!res.ok) throw new Error("something went wrong");
  const data = await res.json()
  return data.results
}


export async function getPokemon(offset: string = "0"): Promise<PokemonListItem[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=24&offset=${offset}`, { cache: "no-store" });
  if (!res.ok) throw new Error("something went wrong");
  const data = await res.json();
  return data.results;
}


export async function getPokemonInfo(id: number): Promise<PokemonDetails> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, { cache: "no-store" });
  return res.json();
}


export async function getPokemonEnemy(): Promise<PokemonDetails> {
  const enemyNumber = Math.floor(Math.random() * 1000);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${enemyNumber}/`, { cache: "no-store" });
  return res.json();
}


export async function makePromiseArray(data: PokemonListItem[]): Promise<Promise<PokemonCardType>[]> {
  return data.map(async (item) => {
    const name = item.name
    const id = Number(item.url.split("/").at(-2));
    const details = await getPokemonInfo(id)
    return { name, id, details }
  })
}

