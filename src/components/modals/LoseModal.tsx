"use client";

import { useRouter } from 'next/navigation';
import { setLoseModalStatus, usePokemonStore } from '../usePokemonStore';
import { useTransition } from 'react';
import { UserType } from '../types';
import { decUserScoreAction } from '@/app/battle/action';




export default function LoseModal({ user, pokemonID }: { user: Pick<UserType, "id" | "name" | "score">, pokemonID: number | undefined; }) {

  const loseModalStatus = usePokemonStore(s => s.loseModalStatus);

  const router = useRouter();

  const [, startTransition] = useTransition();
  function updateScore() {
    startTransition(async () => {
      setLoseModalStatus(false);
      router.push("/allies");
      await decUserScoreAction(user.id, pokemonID);
    });
  }

  return (
    <>
      {loseModalStatus &&
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm'>

          {/* <div className='relative rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-rose-900'> */}
          <div className='relative rounded-2xl border border-slate-700 bg-slate-900 shadow-[0_0_30px] shadow-rose-900'>

            <div className="p-8 flex flex-col items-center text-center">

              <h2 className="text-4xl font-extrabold text-white mb-2">💥 OUCH! 🩹</h2>

              <p className="text-rose-400 mb-6 font-semibold">-50 XP (Emotional damage: +10000)</p>

              <p className="text-md font-medium text-slate-300 leading-relaxed max-w-sm">
                Honorable attempt, <span className="text-amber-300 uppercase">{user?.name}</span>!<br />
                Your strategy was absolutely flawless... except for the part where you lost. 😂 <br />
                Don{"'"}t worry, even the greatest heroes trip over their own capes sometimes.
              </p>

              <p className="mt-6 rounded-lg border border-slate-700 bg-slate-950 px-6 py-4 text-orange-400 text-lg font-bold">
                Still Standing at: {user?.score - 50} XP
              </p>

              <button onClick={updateScore}
                className="mt-8 rounded-lg bg-rose-600 px-6 py-3 font-extrabold text-white shadow-lg shadow-rose-500/40 transition-all hover:bg-rose-500 hover:-translate-y-1 hover:scale-105">
                Plot Revenge (Back To Allies)
              </button>

            </div>
          </div>
        </div>
      }
    </>
  );
}