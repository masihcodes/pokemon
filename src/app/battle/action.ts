"use server";

import { removeAlly, updateUserScore } from '@/components/db/neon';


export async function incUserScoreAction(userID: number) {
  await updateUserScore(userID, true);
}

export async function decUserScoreAction(userID: number, pokemonID?: number) {
  await updateUserScore(userID, false);
  if (pokemonID) await removeAlly(userID, pokemonID);
}