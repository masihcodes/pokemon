import BattleBoard from '@/components/BattleBoard';
import { getAllUserAllies, getUserByCookie } from '@/components/db/neon';
import FleeModal from '@/components/modals/FleeModal';
import LoseModal from '@/components/modals/LoseModal';
import WinModal from '@/components/modals/WinModal';
import { getPokemonEnemy, getPokemonInfo } from '@/components/pokeAPI';
import Link from 'next/link';
import { redirect } from 'next/navigation';




export default async function Battle() {

  const user = await getUserByCookie();
  if (!user || !user.id) redirect('/');

  const allies = await getAllUserAllies(Number(user?.id));
  if (allies.length === 0) {
    return (
      <div className="flex flex-col items-center h-screen justify-center gap-20 text-3xl">
        <p className="text-red-500 animate-pulse">You must have at least 1 ally to battle</p>
        <Link href={"/"} className="flex bg-cyan-600 text-white px-12 py-5 text-xl font-extrabold rounded-xl hover:bg-cyan-500 transition duration-300 ease-in shadow-lg shadow-cyan-500/40 cursor-pointer uppercase tracking-widest"><div>Back to Home</div> </Link>
      </div>
    );
  };

  const myHero = await getPokemonInfo(allies[0].pokemonId);
  const myEnemy = await getPokemonEnemy();


  return (
    <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto p-4 md:p-8">

      <div className="w-full flex-1 flex flex-col justify-center border border-slate-700/50 bg-slate-900/40 rounded-3xl overflow-hidden relative shadow-2xl shadow-cyan-900/20">


        <div className="absolute top-0 left-0 w-full bg-slate-950/80 p-4 border-b border-slate-800 flex justify-between items-center z-10">
          <div className="text-xl font-bold text-cyan-400 uppercase tracking-widest">ROUND 1</div>
          <div className="text-slate-400">Find the weaknesses!</div>
        </div>


        <BattleBoard myHero={myHero} myEnemy={myEnemy} />

      </div>

      <WinModal user={user} />
      <LoseModal user={user} pokemonID={myHero.id} />
      <FleeModal user={user} />

    </main>
  );
}