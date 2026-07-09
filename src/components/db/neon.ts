"use server";

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { allies, users } from './schema';
import { and, desc, eq, sql } from 'drizzle-orm';
import { NewUserType, UserType } from '../types';
import { cookies } from 'next/headers';

import jwt from 'jsonwebtoken';




const connection = neon(process.env.DATABASE_URL!);
const db = drizzle(connection, { logger: true });



export async function getUserByCookie(): Promise<Pick<UserType, "id" | "name" | "email" | "score"> | null> {
  const ACCESS_SECRET = process.env.ACCESS_JWT_SECRET!;
  const REFRESH_SECRET = process.env.REFRESH_JWT_SECRET!;
  const TTL = Number(process.env.ACCESS_TOKEN_TTL);
  const REFRESH_TTL = Number(process.env.REFRESH_TOKEN_TTL);

  const cookie = await cookies();
  const accessToken = cookie.get("accessToken")?.value;
  const refreshToken = cookie.get("refreshToken")?.value

  if (!accessToken && !refreshToken) return null;

  if (accessToken) {
    try {
      const { id } = jwt.verify(accessToken, ACCESS_SECRET) as { id: string }
      const [res] = await db.select({ id: users.id, name: users.name, email: users.email, score: users.score }).from(users).where(eq(users.id, Number(id)))
      if (!res) return null
      return res

    } catch { }
  }

  if (refreshToken) {
    try {
      const { id } = jwt.verify(refreshToken, REFRESH_SECRET) as { id: string }
      const [res] = await db.select({ id: users.id, name: users.name, email: users.email, score: users.score }).from(users).where(eq(users.id, Number(id)))
      if (!res) return null

      const newAccessToken = jwt.sign({ id }, ACCESS_SECRET, { expiresIn: TTL })
      const newRefreshToken = jwt.sign({ id }, REFRESH_SECRET, { expiresIn: REFRESH_TTL })

      cookie.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: TTL,
      })

      cookie.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: REFRESH_TTL,
      })

      return res
    } catch {
      return null
    }
  }
  return null
}


export async function getUserByEmail(email: string): Promise<UserType | null> {
  const [res] = await db
    .select()
    .from(users)
    .where(eq(users.email, email)).limit(1);
  if (!res) return null;
  return res;
}


export async function createUser(newUser: NewUserType) {
  const [res] = await db
    .insert(users)
    .values(newUser)
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
    });
  return res;
}


export async function updateUserScore(userID: number, condition: boolean): Promise<Partial<UserType>> {

  const amount = condition ? 100 : -50;

  const [res] = await db
    .update(users)
    .set({
      score: sql`${users.score} + ${amount}`,
      lastAchieved: new Date()
    })
    .where(eq(users.id, userID))
    .returning({ name: users.name, score: users.score });
  return res;
}


export async function getUsersByRank() {
  const res = await db
    .select({ name: users.name, score: users.score, lastAchieved: users.lastAchieved })
    .from(users)
    .orderBy(desc(users.score))
    .limit(10);
  return res;
}





export async function getAllUserAllies(id: number) {
  const res = await db.select().from(allies).where(eq(allies.userId, id));
  return res;
}


export async function addAlly(userId: number, pokemonId: number) {
  const [res] = await db.insert(allies).values({ userId, pokemonId }).returning();
  return res;
}


export async function removeAlly(userID: number, pokemonID: number) {
  const [res] = await db
    .delete(allies)
    .where(
      and(
        eq(allies.pokemonId, pokemonID),
        eq(allies.userId, userID)
      ))
    .returning();
  return res;
}