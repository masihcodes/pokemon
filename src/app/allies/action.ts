"use server";

import { removeAlly } from '@/components/db/neon';
import { AllyType } from '@/components/types';
import { revalidatePath } from 'next/cache';



export async function removeAllyAction(userID: number, pokemonID: number): Promise<AllyType | null> {
  const res = await removeAlly(userID, pokemonID);
  if (!res) return null;
  revalidatePath("/allies");
  return res;
}