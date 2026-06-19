"use client";

import { useRouter } from 'next/navigation';
import { UserType } from '../types';
import { setFleeModalStatus, usePokemonStore } from '../usePokemonStore';


export default function FleeModal({ user }: { user: Pick<UserType, "id" | "name" | "score">; }) {

  const fleeModalStatus = usePokemonStore(s => s.fleeModalStatus);


  const router = useRouter();

  function handleExit() {
    setFleeModalStatus(false);
    router.push('/allies');
  };


  return (
    <>
      {fleeModalStatus &&
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm'>
          <div className='relative rounded-2xl border border-slate-700 bg-slate-900 shadow-[0_0_30px] shadow-amber-950'>

            <div className="relative p-10 flex flex-col items-center text-center bg-slate-900 rounded-2xl">

              <div className="text-8xl mb-6 flex items-center justify-center gap-10">
                <p role="img" aria-label="white flag" className="animate-bounce">🏳️</p>
                <p role="img" aria-label="running person" className="text-6xl -ml-6 opacity-80">🏃‍♂️</p>
              </div>

              <h2 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
                The <span className="text-amber-400">Tactical Retreat</span>!
              </h2>

              <p className="text-amber-300 mb-6 text-lg font-semibold max-w-md">
                Hey <span className="text-white uppercase font-bold">{user?.name}</span>, bravery is{"'"}nt always about throwing punches. Sometimes its about staying in one piece for the next epic battle! 😉
              </p>

              <p className="mt-8 rounded-full border border-slate-700 bg-slate-950/50 px-8 py-3 text-amber-200 text-lg font-bold shadow-inner">
                Your Galactic Score (Safely Intact): {user?.score} XP
              </p>

              <button
                onClick={handleExit}
                className="mt-8 rounded-lg bg-amber-600 px-6 py-3 font-extrabold text-white shadow-lg shadow-amber-500/40 transition-all hover:bg-amber-500 hover:-translate-y-1 hover:scale-105">
                Alright, Lets Regroup (Back to Allies)

              </button>

            </div>
          </div>
        </div>
      }
    </>
  );
}