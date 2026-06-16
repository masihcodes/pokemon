import AlliesCard from '@/components/AlliesCard';
import { getAllUserAllies, getUserByCookie } from '@/components/db/neon';
import { getPokemonInfo } from '@/components/pokeAPI';
import { Plus, ScanSearch } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';



export default async function Allies() {

  const user = await getUserByCookie();

  if (!user || !user.id) redirect('/');

  const allies = await getAllUserAllies(Number(user?.id));

  const out = allies.map(async (item) => {
    const details = await getPokemonInfo(item.pokemonId);
    return { userID: item.userId, pokemonId: item.pokemonId, details };
  });

  const myAlliesInfo = await Promise.all(out);


  return (
    <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto p-4 md:p-8">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-slate-800 pb-6 gap-4">
        <div>
          <h2 className="text-5xl font-extrabold text-white tracking-tight flex items-center gap-3">
            My Allies
          </h2>
          <p className="text-slate-400 mt-2 text-lg">Your selected team ready for the battle arena</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 px-6 py-3 rounded-xl flex items-center gap-4">
          <span className="text-lg font-bold text-cyan-400">{allies.length} / 6</span>
          <span className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Pokémon</span>
        </div>
      </div>


      <div className="mb-12 flex justify-center">
        <Link href="/battle" className="flex bg-cyan-600 text-white px-12 py-5 text-xl font-extrabold rounded-xl hover:bg-cyan-500 transition duration-300 ease-in shadow-lg shadow-cyan-500/40 cursor-pointer uppercase tracking-widest">
          ENTER BATTLE ARENA
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {myAlliesInfo.map(item => <AlliesCard key={item.pokemonId} myAlly={item} />)}

        {[...Array(6 - (allies.length))].map((_, i) => (
          <Link key={i} href={"/"}>
            <div className='flex flex-col h-83 justify-center items-center rounded-2xl p-8 transition-all duration-300 ease-in border-2 border-dashed border-slate-700 cursor-pointer hover:border-cyan-500/50 bg-slate-900/10 opacity-50 hover:opacity-100'>
              <div className='h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mb-4'>
                <span className='text-3xl text-slate-500'><Plus /></span>
              </div>
              {/* <h3 className='text-xl font-bold text-slate-400'>You have {6 - allies.length} empty slot(s)</h3> */}
              <h3 className='text-xl font-bold text-slate-400'>Empty slot # {i + 1} </h3>
              <p className='text-sm flex items-center gap-1 text-slate-500 mt-2'>Add more Pokémon from Explore <ScanSearch /></p>
            </div>
          </Link>
        ))}
      </div>



    </main>
  );
}