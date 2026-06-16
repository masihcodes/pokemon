"use server";

import { PokemonDetails, PokemonListItem } from './types';

const url = "https://pokeapi.co/api/v2/pokemon?limit=12";


export async function getPokemon(): Promise<PokemonListItem[]> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("something went wrong");
  const data = await res.json();
  return data.results;
}


export async function getPokemonInfo(id: number): Promise<PokemonDetails> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, { cache: "no-store" });
  return res.json();
}