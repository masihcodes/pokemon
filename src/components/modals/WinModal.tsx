"use client";

import { useRouter } from 'next/navigation';
import { UserType } from '../types';
import { setWinModalStatus, usePokemonStore } from '../usePokemonStore';
import { useTransition } from 'react';
import { incUserScoreAction } from '@/app/battle/action';




export default function WinModal({ user }: { user: Pick<UserType, "id" | "name" | "score">; }) {

  const winModalStatus = usePokemonStore(s => s.winModalStatus);

  const router = useRouter();

  const [, startTransition] = useTransition();
  function updateScore() {
    startTransition(async () => {
      setWinModalStatus(false);
      router.push("/allies");
      await incUserScoreAction(user.id);
    });
  }

  return (
    <>
      {winModalStatus &&
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm'>
          <div className='relative rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-cyan-900/70'>

            <div className="p-8 flex flex-col items-center text-center">

              <h2 className="text-4xl font-extrabold text-white mb-2">🏆 BOOM! FLAWLESS! 🏆</h2>
              <p className="text-cyan-400 mb-6 text-lg font-semibold">+150 XP (Absolutely earned!) 🔥</p>
              <p className="text-md font-medium text-slate-300 leading-relaxed max-w-sm">
                Take a bow, <span className="text-amber-300 uppercase font-bold">{user?.name}</span>! You didnt even give them a chance! 😂
              </p>

              <p className="mt-6 rounded-lg border border-slate-700 bg-slate-950 px-6 py-4 text-teal-400 text-lg font-bold animate-pulse">
                Your New, Galactic Score: {user?.score + 150} XP
              </p>

              <button onClick={updateScore}
                className="mt-8 rounded-lg bg-cyan-600 px-6 py-3 font-extrabold text-white shadow-lg shadow-cyan-500/40 transition-all hover:bg-cyan-500 hover:-translate-y-1 hover:scale-105">
                On To The Next Conquest (Allies)
              </button>

            </div>
          </div>
        </div>
      }
    </>
  );
}