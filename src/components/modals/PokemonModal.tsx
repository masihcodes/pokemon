"use client";


import { ArrowBigLeft, Gauge, Heart, Loader, Plus, Shield, Sword } from 'lucide-react';
import { resetTarget, setPokemonModalStatus, setSignInModalStatus, usePokemonStore } from '../usePokemonStore';
import Image from 'next/image';
import { UserType } from '../types';
import { useTransition } from 'react';
import { addAllyAction } from '@/app/action';
import { toast } from 'sonner';





export default function PokemonModal({ user }: { user: Partial<UserType> | null; }) {


  const target = usePokemonStore(s => s.target);
  const pokemonModalStatus = usePokemonStore(s => s.pokemonModalStatus);

  const [pending, startTransition] = useTransition();

  async function handleAdd() {
    startTransition(async () => {
      if (!user?.id) {
        toast.error("Please login first");
        setPokemonModalStatus(false);
        resetTarget();
        setSignInModalStatus(true);
        return;
      }
      const res = await addAllyAction(user?.id, target.id, target.name);
      if (res.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
      setPokemonModalStatus(false);
      resetTarget();
    });
  }


  return (
    <>
      {pokemonModalStatus && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm'>
          <div className='relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-cyan-900/20'>
            <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto p-4 md:p-8">

              <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <button
                  type="button"
                  onClick={() => {
                    setPokemonModalStatus(false);
                    resetTarget();
                  }}
                  className="text-slate-400 flex gap-1 hover:text-cyan-400 transition cursor-pointer">
                  <ArrowBigLeft /> Back
                </button>
                <h2 className="text-5xl text-center font-extrabold tracking-tight text-white md:text-5xl capitalize">
                  {target?.name}
                </h2>
                <span className="flex items-center gap-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                  {target?.details?.types?.[0]?.type?.name}
                </span>
              </div>

              <div className="relative mx-auto mb-8 w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/90 p-8 flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1 flex justify-center bg-slate-900/50 rounded-2xl p-10 border border-slate-800">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${target?.id}.png`}
                    width={256}
                    height={256}
                    alt={target?.name}
                    className="w-64 h-64 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)] animate-pulse" />
                </div>

                <div className="flex-1 w-full flex flex-col gap-6">
                  <h3 className="flex items-center gap-2 text-2xl font-bold text-white">
                    Base Stats
                  </h3>

                  <div className="flex flex-col gap-4">
                    {[
                      { label: <Heart />, name: 'HP', value: target?.details?.stats?.[0]?.base_stat, color: 'bg-emerald-500' },
                      { label: <Sword />, name: 'Attack', value: target?.details?.stats?.[1]?.base_stat, color: 'bg-rose-500' },
                      { label: <Shield />, name: 'Defense', value: target?.details?.stats?.[2]?.base_stat, color: 'bg-sky-500' },
                      { label: <Gauge />, name: 'Speed', value: target?.details?.stats?.[5]?.base_stat, color: 'bg-amber-500' },
                    ].map((stat, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-bold flex items-center gap-1 text-slate-300">{stat.name}{stat.label} </span>
                          <span className="text-cyan-400 font-bold">{stat.value || 0}</span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-700">
                          <div
                            className={`${stat.color} h-2.5 rounded-full`}
                            style={{ width: `${((stat.value || 0) * 100) / 255}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-slate-800 pt-6">
                    <button onClick={handleAdd}
                      type="button"
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-8 py-4 font-bold text-white shadow-lg shadow-cyan-500/40 transition-all hover:bg-cyan-500 hover:scale-105">
                      {pending ? <Loader className="animate-spin" /> : <Plus />}Add to My Roster
                    </button>
                  </div>
                </div>
              </div>

            </main>
          </div>
        </div>
      )}
    </>
  );
}