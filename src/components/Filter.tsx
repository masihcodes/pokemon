"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useState } from "react";




export default function Filter() {


  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleFilter(userSearchText: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("offset", "0")
    params.set("filter", userSearchText)
    router.replace(`${pathname}?${params.toString()}`)
  }


  // const [userSearchText, setUserSearchText] = useState("")
  // const filteredPokemonData = allPokemonData.filter(item => item.name.toLowerCase().includes(userSearchText.toLowerCase()))
  // console.log('filteredPokemonData', filteredPokemonData)


  return (
    <div className="flex w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 transition-all focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
      <input
        onChange={e => handleFilter(e.target.value)}
        type="text"
        placeholder="e.g., Pikachu, Charizard..."
        className="w-full bg-transparent py-4 px-6 text-white placeholder-slate-500 focus:outline-none" />
    </div>
  );
}
