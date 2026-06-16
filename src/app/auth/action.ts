"use server";

import { createUser, getUserByEmail, verifyUser } from '@/components/db/neon';
import { ActionResponse, SignupSchema } from '@/components/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';





export async function signUpAction(prev: (ActionResponse | null), formdata: FormData): Promise<ActionResponse> {
  try {

    const payload = Object.fromEntries(formdata);
    const { data, success, error } = SignupSchema.safeParse(payload);
    if (!success) return { success: false, message: z.prettifyError(error) };


    const res = await getUserByEmail(data.email);
    if (res) return { success: false, message: 'This email address already exists.' };


    const user = await createUser(data);

    const cookie = await cookies();
    cookie.set("user_token", user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    revalidatePath('/');
    return { success: true, message: "Your account has been successfully created" };

  } catch (error: unknown) {
    return (error instanceof Error) ? { success: false, message: error.message } : { success: false, message: String(error) };
  }
}


export async function signInAction(prev: (ActionResponse | null), formData: FormData): Promise<ActionResponse> {

  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) return { success: false, message: 'Email and password are required' };

    const user = await verifyUser({ email, password });
    if (!user) return { success: false, message: 'Invalid email or password' };

    const cookie = await cookies();
    cookie.set("user_token", user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    revalidatePath('/');
    return { success: true, message: `Welcome back ${user.name}!` };

  } catch (error: unknown) {
    return (error instanceof Error) ? { success: false, message: error.message } : { success: false, message: String(error) };
  }
};


export async function signOutAction() {
  const cookie = await cookies();
  cookie.delete("user_token");
  revalidatePath('/');
}