'use client';

import Image from 'next/image';
import { PokemonDetails } from './types';
import { useEffect, useState } from 'react';
import { Drum, Frown, Gauge, Heart, Shield, Skull, Sword } from 'lucide-react';
import { setFleeModalStatus, setLoseModalStatus, setWinModalStatus } from './usePokemonStore';






export default function BattleBoard({ myHero, myEnemy }: { myHero: PokemonDetails; myEnemy: PokemonDetails; }) {

  const [startBattle, setStartBattle] = useState(false);
  const [battle, setBattle] = useState({
    myHP: myHero.stats[0].base_stat,
    enemyHP: myEnemy.stats[0].base_stat,
    isMyTurn: myHero.stats[5].base_stat >= myEnemy.stats[5].base_stat,
    currentLog: "Let's do this!",
    isDefending: false,
    battleLog: [
      [
        `${myHero.name} unleashes a devastating strike!`,
        `A brilliant move by ${myHero.name}! Direct hit!`,
        `${myHero.name} charges forward with blinding speed!`,
        `Critical blow! ${myHero.name} shows no mercy!`,
      ],
      [
        `The wild ${myEnemy.name} counters with a ferocious attack!`,
        `${myEnemy.name} strikes back ruthlessly!`,
        `Watch out! ${myEnemy.name} lands a heavy blow!`,
        `Brutal attack! ${myEnemy.name} unleashes a devastating strike!`,
      ],
    ],
  });




  function attackHandler() {
    if (battle.isMyTurn && startBattle && !(battle.myHP <= 0) && !(battle.enemyHP <= 0)) {
      const randomMessage = battle.battleLog[0][Math.floor(Math.random() * battle.battleLog[0].length)];
      const damage = Math.max(1, Math.floor((myHero.stats[1].base_stat * 10) / myEnemy.stats[2].base_stat) + (Math.floor(Math.random() * 5) + 1),);
      setBattle({ ...battle, enemyHP: (battle.enemyHP - damage), isMyTurn: false, currentLog: randomMessage });
    }
  }

  function defendHandler() {
    if (battle.isMyTurn && startBattle && battle.myHP > 0 && battle.enemyHP > 0) {
      setBattle({
        ...battle,
        isMyTurn: false,
        isDefending: true,
        currentLog: `${myHero.name} braces for impact! Defense sharply rose!`
      });
    }
  }

  useEffect(() => {

    if (!battle.isMyTurn && startBattle && !(battle.myHP <= 0) && !(battle.enemyHP <= 0)) {
      const timer = setTimeout(() => {
        const randomMessage = battle.battleLog[1][Math.floor(Math.random() * battle.battleLog[1].length)];
        let damage = Math.max(1, Math.floor((myEnemy.stats[1].base_stat * 10) / myHero.stats[2].base_stat) + (Math.floor(Math.random() * 5) + 1));

        if (battle.isDefending)
          damage = Math.floor(damage / 2);

        setBattle({
          ...battle,
          myHP: (battle.myHP - damage),
          isMyTurn: true,
          isDefending: false,
          currentLog: battle.isDefending ? `Enemy attacked, but ${myHero.name} blocked half the damage!` : randomMessage
        });
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (battle.myHP <= 0) setLoseModalStatus(true);

    if (battle.enemyHP <= 0) setWinModalStatus(true);

  }, [battle, startBattle]);



  const myHpPercent = (battle.myHP / myHero.stats[0].base_stat) * 100;
  const enemyPercent = (battle.enemyHP / myEnemy.stats[0].base_stat) * 100;


  return (
    <>
      <div className='flex-1 flex flex-col md:flex-row relative mt-16 p-8'>
        <div className='flex-1 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-slate-800/50 pb-8 md:pb-0'>
          <div className='w-full max-w-sm bg-slate-950 border border-slate-700 rounded-xl p-4 mb-8 shadow-lg shadow-cyan-500/10'>

            <div className='flex justify-between items-end mb-2'>
              <h3 className='text-2xl font-bold text-white capitalize'>{myHero.name}</h3>
              <span className='text-sm text-slate-400'>Lv.50</span>
            </div>


            <div className='w-full bg-slate-800 rounded-full h-4 border border-slate-700 overflow-hidden'>
              <div className={`h-full transition-all duration-500 ${myHpPercent > 50 ? 'bg-emerald-500' : myHpPercent > 20 ? 'bg-amber-400' : 'bg-rose-500'}`}
                style={{ width: `${Math.max(0, myHpPercent)}%` }}>
              </div>
            </div>
            <div className='text-right text-xs text-emerald-500 mb-1 flex items-center justify-end gap-2'>
              {battle.myHP <= 0 ? <Skull /> : <Heart />}{Math.max(0, (battle.myHP))} / {myHero.stats[0].base_stat} HP
            </div>

            <div className='flex justify-center'>
              <div className="flex flex-col mt-3 ">
                <span className="flex border border-slate-700 text-rose-500 gap-1 p-1"><Sword />Attack</span>
                <span className="flex justify-center border border-slate-700 text-rose-500 gap-1 p-1">{myHero.stats[1].base_stat}</span>
              </div>
              <div className="flex flex-col mt-3 ">
                <span className="flex border border-slate-700 text-sky-500 gap-1 p-1"><Shield />Defense</span>
                <span className="flex justify-center border border-slate-700 text-sky-500 gap-1 p-1">{myHero.stats[2].base_stat}</span>
              </div>
              <div className="flex flex-col mt-3 ">
                <span className="flex border border-slate-700 text-amber-500 gap-1 p-1"><Gauge />Speed</span>
                <span className="flex justify-center border border-slate-700 text-amber-500 gap-1 p-1">{myHero.stats[5].base_stat}</span>
              </div>
            </div>

          </div>
          <Image
            width={100}
            height={100}
            alt='pokemon'
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${myHero.id}.png`}
            className={`w-48 h-48 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)] ${battle.isMyTurn ? "animate-bounce" : ""}`}
            style={{ animationDuration: "2s", opacity: Math.max(0, (battle.myHP / myHero.stats[0].base_stat) * 100) }}
          />
        </div>

        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-slate-900 border-4 border-slate-950 rounded-full p-4 shadow-2xl'>
          <span className='text-3xl font-black text-rose-500 italic'>VS</span>
        </div>

        <div className='flex-1 flex flex-col justify-center items-center pt-8 md:pt-0'>
          <Image
            width={100}
            height={100}
            alt='pokemon'
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${myEnemy.id}.png`}
            className={`w-48 h-48 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)] ${!battle.isMyTurn ? "animate-bounce" : ""}`}
            style={{ animationDuration: "2s", opacity: Math.max(0, (battle.enemyHP / myEnemy.stats[0].base_stat) * 100) }} />

          <div className='w-full max-w-sm bg-slate-950 border border-slate-700 rounded-xl p-4 mt-8 shadow-lg shadow-rose-500/10'>

            <div className='flex justify-between items-end mb-2'>
              <h3 className='text-2xl font-bold text-white capitalize'>{myEnemy.name}</h3>
              <span className='text-sm text-slate-400'>Lv.50</span>
            </div>
            <div className='w-full bg-slate-800 rounded-full h-4 border border-slate-700 overflow-hidden'>
              <div className={`h-full transition-all duration-500 ${enemyPercent > 50 ? 'bg-emerald-500' : enemyPercent > 20 ? 'bg-amber-400' : 'bg-rose-500'}`}
                style={{ width: `${Math.max(0, enemyPercent)}%` }}>
              </div>
            </div>
            <div className='text-right text-xs text-emerald-500 mb-1 flex items-center justify-end gap-2'>
              {battle.enemyHP <= 0 ? <Skull /> : <Heart />}{Math.max(0, (battle.enemyHP))} / {myEnemy.stats[0].base_stat} HP
            </div>


            <div className='flex justify-center'>
              <div className="flex flex-col mt-3 ">
                <span className="flex border border-slate-700 text-rose-500 gap-1 p-1"><Sword />Attack</span>
                <span className="flex justify-center border border-slate-700 text-rose-500 gap-1 p-1">{myEnemy.stats[1].base_stat}</span>
              </div>
              <div className="flex flex-col mt-3 ">
                <span className="flex border border-slate-700 text-sky-500 gap-1 p-1"><Shield />Defense</span>
                <span className="flex justify-center border border-slate-700 text-sky-500 gap-1 p-1">{myEnemy.stats[2].base_stat}</span>
              </div>
              <div className="flex flex-col mt-3 ">
                <span className="flex border border-slate-700 text-amber-500 gap-1 p-1"><Gauge />Speed</span>
                <span className="flex justify-center border border-slate-700 text-amber-500 gap-1 p-1">{myEnemy.stats[5].base_stat}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className='bg-slate-950 p-6 md:p-10 border-t border-slate-800'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>

          <div className={`border rounded-xl p-4 font-mono text-center text-lg font-bold shadow-inner flex flex-col justify-center h-full transition-colors duration-300 ${battle.isMyTurn ? 'bg-cyan-950/40 border-cyan-800 text-cyan-300' : 'bg-rose-950/40 border-rose-800 text-rose-300'}`}>
            <p className="text-start mb-4">{battle.isMyTurn ? `-> ${myHero.name?.toUpperCase()}:` : `-> ${myEnemy.name?.toUpperCase()}:`}</p>
            <p>{battle.currentLog}</p>
          </div>

          <div className='grid grid-cols-2 gap-4'>

            <button onClick={attackHandler}
              disabled={!battle.isMyTurn}
              className='bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-xl font-bold text-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-colors border border-cyan-400/50 flex items-center justify-center gap-2 disabled:bg-slate-700 disabled:text-slate-500 disabled:border-slate-600 disabled:cursor-not-allowed disabled:shadow-none'>
              {battle.isMyTurn ? "Eat This!" : "Enemy Turn"}<Sword />
            </button>

            <button onClick={defendHandler}
              disabled={!battle.isMyTurn}
              className='bg-teal-600 hover:bg-teal-500 text-white py-4 rounded-xl font-bold text-lg border border-slate-600 transition-colors flex items-center justify-center gap-2 disabled:bg-slate-700 disabled:text-slate-500 disabled:border-slate-600 disabled:cursor-not-allowed disabled:shadow-none'>
              Turtle Mode!<Shield />
            </button>

            <button onClick={() => setFleeModalStatus(true)}
              className='bg-rose-600 hover:bg-rose-500 text-white py-4 rounded-xl font-bold text-lg border border-slate-600 transition-colors flex items-center justify-center gap-2'>
              Save My Bacon!<Frown />
            </button>

            <button
              onClick={() => setStartBattle(true)}
              disabled={startBattle}
              className='bg-violet-900/40 hover:bg-violet-800 text-white py-4 rounded-xl font-bold text-lg border border-violet-700/50 transition-colors flex items-center justify-center gap-2 animate-pulse disabled:bg-slate-700 disabled:text-slate-500 disabled:border-slate-600 disabled:cursor-not-allowed disabled:shadow-none'>
              Let{"'"}s begin!<Drum />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
