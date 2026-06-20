"use client";

import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';




export default function Pagination() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentOffset = Number(searchParams.get("offset")) || 0;

  function inc() {
    const params = new URLSearchParams(searchParams.toString());
    const newPage = Math.max(0, (Number(params.get("offset")) + 24));
    params.set("offset", String(newPage));
    router.replace(`${pathname}?${params.toString()}`);
  }

  function dec() {
    const params = new URLSearchParams(searchParams.toString())
    const newPage = Math.max(0, (Number(params.get("offset")) - 24))
    params.set("offset", String(newPage));
    router.replace(`${pathname}?${params.toString()}`)
  }


  return (
    <div className="flex items-center justify-center my-8 gap-8">
      <button
        onClick={dec}
        disabled={currentOffset === 0}
        className="bg-cyan-500/80 disabled:bg-slate-800 disabled:text-slate-600 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer rounded-4xl w-12 h-12 flex items-center justify-center text-white hover:bg-cyan-600 hover:scale-110 transition-all duration-300 ease-out">
        <CircleChevronLeft className="w-12 h-12" />
      </button>

      <div className="flex items-center justify-center text-white text-4xl font-extrabold hover:text-cyan-400">
        {Math.ceil(currentOffset / 24) + 1}
      </div>

      <button onClick={inc}
        className=" bg-cyan-500/80 cursor-pointer rounded-4xl w-12 h-12 flex items-center justify-center text-white hover:bg-cyan-600 hover:scale-110 transition-all duration-300 ease-out " >
        <CircleChevronRight className="w-12 h-12 hover:scale-110 transition-all duration-300 ease-out" />
      </button>

    </div>
  );
}