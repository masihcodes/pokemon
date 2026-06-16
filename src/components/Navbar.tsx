"use client";


import { signOutAction } from '@/app/auth/action';
import { ChessQueen, Compass, LogIn, LogOut, Swords, User2, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { setSignInModalStatus } from './usePokemonStore';
import { UserType } from './types';


export default function Navbar({ user }: { user: Partial<UserType> | null; }) {


  const path = usePathname();



  return (
    <nav className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">

      <div className="flex items-center justify-between">
        <h1 className="flex flex-1 items-center justify-start ml-5 text-2xl font-bold text-cyan-400">
          Poké<span className="text-slate-100">mon</span>
        </h1>
        <div className="flex flex-2 items-center justify-center gap-10">
          <Link
            href="/"
            className={
              path === '/'
                ? 'flex items-center gap-1 font-medium text-cyan-400'
                : 'flex items-center gap-1 text-slate-400 transition hover:text-cyan-300'
            }>
            <Compass />
            Explore
          </Link>

          <Link
            href={user?.name ? "/allies" : "#"}
            onClick={(e) => {
              if (!user?.name) {
                e.preventDefault();
                setSignInModalStatus(true);
              }
            }}
            className={
              path === '/allies'
                ? 'flex items-center gap-1 font-medium text-cyan-400'
                : 'flex items-center gap-1 text-slate-400 transition hover:text-cyan-300'
            }>
            <Users />
            Allies
          </Link>

          <Link
            href={user?.name ? "/battle" : "#"}
            onClick={(e) => {
              if (!user?.name) {
                e.preventDefault();
                setSignInModalStatus(true);
              }
            }}
            className={
              path === '/battle'
                ? 'flex items-center gap-1 font-medium text-cyan-400'
                : 'flex items-center gap-1 text-slate-400 transition hover:text-cyan-300'
            }>
            <Swords />
            Battle Arena
          </Link>

          <Link
            href={user?.name ? "/leaderboard" : "#"}
            onClick={(e) => {
              if (!user?.name) {
                e.preventDefault();
                setSignInModalStatus(true);
              }
            }}
            className={
              path === '/leaderboard'
                ? 'flex items-center gap-1 font-medium text-cyan-400'
                : 'flex items-center gap-1 text-slate-400 transition hover:text-cyan-300'
            }>
            <ChessQueen />
            Leaderboard
          </Link>
        </div>


        <div className="flex flex-1 items-center justify-end mr-5">
          {user?.name ?
            (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4 px-4 py-2 border rounded-full border-slate-700/50 bg-slate-800/40 hover:shadow-lg hover:shadow-cyan-500/40">
                  <User2 />
                  <span className="text-md font-bold bg-linear-to-r from-slate-100 to-cyan-400 bg-clip-text text-transparent tracking-widest ">
                    {user?.name.toUpperCase()}
                  </span>
                  <span className="h-3 w-3 rounded-full animate-ping bg-green-800"></span>
                </div>
                <button
                  onClick={signOutAction}
                  className="group flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-md font-medium text-slate-400 transition-all hover:bg-rose-500/10 hover:text-rose-400 hover:shadow-lg hover:shadow-rose-500/40 hover:rounded-full">
                  <LogOut className="transition-transform group-hover:-translate-x-0.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            )
            :
            (
              <p
                onClick={() => setSignInModalStatus(true)}
                className="flex items-center gap-3 text-slate-400 transition hover:text-cyan-300 cursor-pointer">
                <LogIn />Sign In
              </p>
            )}
        </div>
      </div>

    </nav>
  );
}