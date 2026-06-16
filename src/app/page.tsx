import { getPokemon, getPokemonInfo } from '@/components/pokeAPI';
import PokemonCard from '@/components/PokemonCard';
import PokemonModal from '@/components/modals/PokemonModal';
import SignInModal from '@/components/modals/SignInModal';
import SignUpModal from '@/components/modals/SignUpModal';
import { getUserByCookie } from '@/components/db/neon';


export default async function Home() {

  const data = await getPokemon();

  const promisesArray = data.map(async (item) => {
    const name = item.name;
    const id = Number(item.url.split("/").at(-2));
    const details = await getPokemonInfo(id);
    return { name, id, details };
  });
  const allPokemonInfo = await Promise.all(promisesArray);

  const user = await getUserByCookie();

  return (
    <>

      <header className="text-center my-12">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white tracking-widest">Find Your Pokémon</h2>
        <p className="text-slate-400 mb-8 text-lg">Search the Pokédex, or add powerful allies to your roster.</p>
        <div className="flex flex-col sm:flex-row max-w-4xl items-center justify-center mx-auto gap-3">
          <div className="flex w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 transition-all focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
            <input type="text" placeholder="e.g., Pikachu, Charizard..." className="w-full bg-transparent py-4 px-6 text-white placeholder-slate-500 focus:outline-none" />
          </div>
        </div>
      </header>



      <div className="grid grid-cols-2 m-10 gap-10 md:grid-cols-3 lg:grid-cols-4">
        {allPokemonInfo.map(item => (<PokemonCard key={item.id} name={item.name} id={item.id} details={item.details} />))}
      </div>


      <PokemonModal user={user} />
      <SignInModal />
      <SignUpModal />
    </>
  );
}
