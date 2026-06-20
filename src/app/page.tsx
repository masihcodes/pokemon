import { getAllPokemon, getPokemon, getPokemonInfo, makePromiseArray } from '@/components/pokeAPI';
import PokemonCard from '@/components/PokemonCard';
import PokemonModal from '@/components/modals/PokemonModal';
import SignInModal from '@/components/modals/SignInModal';
import SignUpModal from '@/components/modals/SignUpModal';
import { getUserByCookie } from '@/components/db/neon';
import Pagination from '@/components/Pagination';
import Filter from '@/components/Filter';





export default async function Home({ searchParams }: { searchParams: { offset: string; filter: string } }) {

  const params = await searchParams;
  const offset = Number(params.offset) || 0
  const userSearchText = params.filter?.toLowerCase() || ""

  const allPokemonData = await getAllPokemon()

  const filteredData = allPokemonData.filter(item => item.name?.toLowerCase().includes(userSearchText))

  const paginatedFilteredData = filteredData.slice(offset, offset + 24)

  const promisesArray = await makePromiseArray(paginatedFilteredData)

  const paginatedPokemonInfo = await Promise.all(promisesArray)

  const user = await getUserByCookie();



  return (
    <>

      <header className="text-center my-12">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white tracking-widest">Find Your Pokémon</h2>
        <p className="text-slate-400 mb-8 text-lg">Search the Pokédex, or add powerful allies to your roster.</p>
        <div className="flex flex-col sm:flex-row max-w-4xl items-center justify-center mx-auto gap-3">
          <Filter />
        </div>
      </header>



      <div className="grid grid-cols-2 m-10 gap-10 md:grid-cols-3 lg:grid-cols-4">
        {paginatedPokemonInfo.map(item => (<PokemonCard key={item.id} name={item.name} id={item.id} details={item.details} />))}
      </div>

      <Pagination />

      <PokemonModal user={user} />
      <SignInModal />
      <SignUpModal />
    </>
  );
}
