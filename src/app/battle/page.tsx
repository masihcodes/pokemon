import { getAllUserAllies, getUserByCookie } from '@/components/db/neon';
import Image from 'next/image';
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


  return (
    <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto p-4 md:p-8">

      <div className="w-full flex-1 flex flex-col justify-center border border-slate-700/50 bg-slate-900/40 rounded-3xl overflow-hidden relative shadow-2xl shadow-cyan-900/20">


        <div className="absolute top-0 left-0 w-full bg-slate-950/80 p-4 border-b border-slate-800 flex justify-between items-center z-10">
          <div className="text-xl font-bold text-cyan-400 uppercase tracking-widest">ROUND 1</div>
          <div className="text-slate-400">Find the weaknesses!</div>
        </div>


        <div className="flex-1 flex flex-col md:flex-row relative mt-16 p-8">


          <div className="flex-1 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-slate-800/50 pb-8 md:pb-0">
            <div className="w-full max-w-sm bg-slate-950 border border-slate-700 rounded-xl p-4 mb-8 shadow-lg shadow-cyan-500/10">
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-2xl font-bold text-white capitalize">Pikachu</h3>
                <span className="text-sm text-slate-400 font-mono">Lv.50</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-4 border border-slate-700 overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all duration-500 w-full"></div>
              </div>
              <div className="text-right text-xs text-slate-500 mt-1 font-mono">35 / 35 HP</div>
            </div>
            <Image width={100} height={100} alt="pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" className="w-48 h-48 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)] animate-bounce animation-duration: 3s;" />
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-slate-900 border-4 border-slate-950 rounded-full p-4 shadow-2xl">
            <span className="text-3xl font-black text-rose-500 italic">VS</span>
          </div>


          <div className="flex-1 flex flex-col justify-center items-center pt-8 md:pt-0">
            <Image width={100} height={100} alt="pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png" className="w-48 h-48 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)] opacity-90 scale-x-[-1]" />
            <div className="w-full max-w-sm bg-slate-950 border border-slate-700 rounded-xl p-4 mt-8 shadow-lg shadow-rose-500/10">
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-2xl font-bold text-white capitalize">Gengar</h3>
                <span className="text-sm text-slate-400 font-mono">Lv.50</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-4 border border-slate-700 overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all duration-500 w-full" ></div>
              </div>
              <div className="text-right text-xs text-slate-500 mt-1 font-mono">60 / 60 HP</div>
            </div>
          </div>

        </div>


        <div className="bg-slate-950 p-6 md:p-10 border-t border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 font-mono text-sm shadow-inner flex items-center h-full">
              {` > A wild Gengar appeared!`}
              {` > What will Pikachu do?`}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-xl font-bold text-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-colors border border-cyan-400/50">ATTACK</button>
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-4 rounded-xl font-bold text-lg border border-slate-600 transition-colors">DEFEND</button>
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-4 rounded-xl font-bold text-lg border border-slate-600 transition-colors">ITEM</button>
              <button className="bg-rose-900/40 hover:bg-rose-800 text-rose-300 py-4 rounded-xl font-bold text-lg border border-rose-700/50 transition-colors">RUN</button>
            </div>
          </div>
        </div>

      </div>



      <div className="hidden fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 backdrop-blur-sm">
        <div className="relative z-10 flex w-full max-w-lg flex-col rounded-2xl border border-cyan-500/50 bg-slate-900 shadow-2xl shadow-cyan-500/20">
          <div className="p-8 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-2">VICTORY!</h2>
            <p className="text-slate-400 mb-8">+150 XP Earned</p>

            <form className="space-y-4">
              <label className="block text-left text-sm font-medium text-slate-300">
                Enter name for Leaderboard:
                <input type="text" placeholder="Your Username" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-4 text-white transition-colors focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-lg" />
              </label>
              <button type="button" className="w-full mt-6 flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 py-4 font-bold text-white shadow-lg shadow-cyan-500/40 transition-all hover:bg-cyan-500 uppercase tracking-wider">
                Save Score
              </button>
            </form>
          </div>
        </div>
      </div>

    </main>
  );
}