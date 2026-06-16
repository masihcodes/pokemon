"use client";

import Image from 'next/image';
import { PokemonCardType } from './types';
import { setPokemonModalStatus, setTarget } from './usePokemonStore';




export default function PokemonCard({ name, id, details }: PokemonCardType) {



  return (
    <div className="group flex flex-col rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6 transition-all duration-500 hover:scale-105 hover:border-cyan-500/90 hover:bg-slate-800 hover:shadow-lg hover:shadow-cyan-500/40">
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all">{details.types[0]?.type?.name}</span>
          <span className="text-slate-400 text-sm font-bold">
            #{String(id).padStart(3, '0')}
          </span>
        </div>
        <div className="flex justify-center my-4">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt={name}
            width={160}
            height={160}
            className="h-40 w-40 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="flex justify-center items-center gap-2 text-white transition-colors group-hover:text-cyan-400">
          <h3 className="text-2xl font-extrabold capitalize">{name}</h3>
        </div>
      </div>
      <div className="mt-auto flex w-full shadow-sm pt-4">
        <button onClick={() => {
          setPokemonModalStatus(true);
          setTarget({ name, id, details });
        }} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-800 py-3 font-medium text-cyan-400 transition-colors hover:bg-slate-700 hover:text-white cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
}