"use server";

import { createUser, getUserByEmail } from '@/components/db/neon';
import { ActionResponse, SigninSchema, SignupSchema } from '@/components/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"


const ACCESS_SECRET = process.env.ACCESS_JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_JWT_SECRET!;
const TTL = Number(process.env.ACCESS_TOKEN_TTL);
const REFRESH_TTL = Number(process.env.REFRESH_TOKEN_TTL);


export async function signUpAction(prev: (ActionResponse | null), formdata: FormData): Promise<ActionResponse> {
  try {

    const payload = Object.fromEntries(formdata);
    const { data, success, error } = SignupSchema.safeParse(payload);

    if (!success) {
      const issue = error.issues.map(i => ({ [i.path.toString()]: i.message }))
      return { success: false, message: JSON.stringify(issue) };
    }

    const res = await getUserByEmail(data.email);
    if (res) return { success: false, message: 'This email address already exists.' };


    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await createUser({ name: data.name, email: data.email, password: hashedPassword });

    const accessToken = jwt.sign({ id: String(user.id) }, ACCESS_SECRET, { expiresIn: TTL })
    const refreshToken = jwt.sign({ id: String(user.id) }, REFRESH_SECRET, { expiresIn: REFRESH_TTL })

    const cookie = await cookies();
    cookie.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: TTL,
    });

    cookie.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: REFRESH_TTL,
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

    const { data, success, error } = SigninSchema.safeParse({ email, password });

    if (!success) {
      const issue = error.issues.map(i => ({ [i.path.join()]: i.message }))
      return { success: false, message: JSON.stringify(issue) };
    }

    const user = await getUserByEmail(data.email);
    if (!user) return { success: false, message: 'Invalid email or password' };

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) return { success: false, message: 'Invalid email or password' };

    const accessToken = jwt.sign({ id: String(user.id) }, ACCESS_SECRET, { expiresIn: TTL })
    const refreshToken = jwt.sign({ id: String(user.id) }, REFRESH_SECRET, { expiresIn: REFRESH_TTL })

    const cookie = await cookies();
    cookie.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: TTL,
    });

    cookie.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: REFRESH_TTL,
    });

    revalidatePath('/');
    return { success: true, message: `Welcome back ${user.name}!` };

  } catch (error: unknown) {
    return (error instanceof Error) ? { success: false, message: error.message } : { success: false, message: String(error) };
  }
};


export async function signOutAction() {
  const cookie = await cookies();
  cookie.delete("accessToken")
  cookie.delete("refreshToken");
  revalidatePath('/');
}