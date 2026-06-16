"use server";

import { addAlly, getAllUserAllies, getUserByCookie } from '@/components/db/neon';
import { ActionResponse } from '@/components/types';
import { revalidatePath } from 'next/cache';



export async function addAllyAction(userID: number, pokemonID: number, name: string): Promise<ActionResponse> {

  try {
    const user = await getUserByCookie();
    if (!user) return { success: false, message: 'You must be logged in to add allies' };

    const res = await getAllUserAllies(userID);
    if (res.length >= 6) return { success: false, message: 'You can only have 6 allies' };

    if (res.some(item => item.pokemonId === pokemonID)) return { success: false, message: 'You already have this ally' };

    await addAlly(userID, pokemonID);

    revalidatePath("/allies");
    return { success: true, message: `You have successfully added ${name} to your allies` };


  } catch (error: unknown) {
    return error instanceof Error ? { success: false, message: error.message } : { success: false, message: String(error) };
  }




}