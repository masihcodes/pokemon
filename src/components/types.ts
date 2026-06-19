import { allies, users } from './db/schema';
import { z } from 'zod';

export interface PokemonListItem {
  name: string;
  url: string;
}


export interface PokemonType {
  type: {
    name: string;
  };
}


export interface PokemonStat {
  base_stat: number;
}


export interface PokemonDetails {
  types: PokemonType[];
  stats: PokemonStat[];
  name?: string;
  id?: number;
}

export interface PokemonCardType {
  id: number;
  name: string;
  details: PokemonDetails;
}

export interface PokemonStoreType {
  target: PokemonCardType;
  pokemonModalStatus: boolean;
  signInModalStatus: boolean;
  signUpModalStatus: boolean;
  winModalStatus: boolean;
  loseModalStatus: boolean;
  fleeModalStatus: boolean;
}



export interface ActionResponse {
  success: boolean;
  message: string;
}

export type UserType = typeof users.$inferSelect;

export type NewUserType = typeof users.$inferInsert;

export type AllyType = typeof allies.$inferSelect;




export const SignupSchema = z.object({
  name: z.string().trim().min(1, { message: "need at least one character" }).max(50, { message: "maximum characters are 50" }),
  email: z.email().toLowerCase(),
  password: z.string().min(8, { message: "password should be at least 8 character" }).max(22),
});

