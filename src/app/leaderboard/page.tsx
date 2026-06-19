import { getUserByCookie, getUsersByRank } from '@/components/db/neon';
import { redirect } from 'next/navigation';





export default async function leaderboard() {

  const user = await getUserByCookie();
  if (!user) redirect("/");

  const users = await getUsersByRank();


  return (
    <>
      <main className="flex-1 flex flex-col max-w-7xl mx-auto p-4 md:p-8">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-slate-800 pb-6 gap-4">
          <div>
            <h2 className="text-5xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Hall of Fame
            </h2>
            <p className="text-slate-400 mt-2 text-lg">Top trainers ranked by battle score</p>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-slate-700/50 bg-slate-800/30 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700 font-bold tracking-wider">
                <tr>
                  <th className="px-8 py-5 text-center">Rank</th>
                  <th className="px-6 py-5 text-center">Trainer Name</th>
                  <th className="px-6 py-5 text-center">Score</th>
                  <th className="px-6 py-5 text-center">Date Achieved</th>
                </tr>
              </thead>
              <tbody className="bg-slate-900/30">

                {users.map((user, i) => {
                  if (i === 0) {
                    return (
                      <tr key={i} className="hover:bg-slate-800/50">
                        <td className="px-8 py-5 text-center">
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 font-bold text-lg shadow-[0_0_10px_rgba(245,158,11,0.2)]">1</span>
                        </td>
                        <td className="px-6 py-5 text-center font-bold text-white text-lg">{user.name}</td>
                        <td className="px-6 py-5 text-center text-cyan-400 font-bold text-lg">{user.score}</td>
                        <td className="px-6 py-5 text-center text-slate-500">{user.lastAchieved.toLocaleTimeString()} – {user.lastAchieved.toLocaleDateString()}</td>
                      </tr>
                    );
                  } else if (i === 1) {
                    return (
                      <tr key={i} className="hover:bg-slate-800/50">
                        <td className="px-8 py-5 text-center">
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-400/20 border border-slate-400/50 text-slate-300 font-bold text-lg">2</span>
                        </td>
                        <td className="px-6 py-5 text-center font-medium text-slate-200">{user.name}</td>
                        <td className="px-6 py-5 text-center text-cyan-400 font-bold">{user.score}</td>
                        <td className="px-6 py-5 text-center text-slate-500">{user.lastAchieved.toLocaleTimeString()} – {user.lastAchieved.toLocaleDateString()}</td>
                      </tr>
                    );

                  } else if (i === 2) {
                    return (
                      <tr key={i} className="hover:bg-slate-800/50">
                        <td className="px-8 py-5 text-center">
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-700/20 border border-amber-700/50 text-amber-600 font-bold text-lg">3</span>
                        </td>
                        <td className="px-6 py-5 text-center font-medium text-slate-200">{user.name}</td>
                        <td className="px-6 py-5 text-center text-cyan-400 font-bold">{user.score}</td>
                        <td className="px-6 py-5 text-center text-slate-500">{user.lastAchieved.toLocaleTimeString()} – {user.lastAchieved.toLocaleDateString()}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={i} className="hover:bg-slate-800/50">
                        <td className="px-8 py-5 text-center">
                          <span className="flex items-center justify-center h-8 w-8 text-slate-500 font-bold text-lg">{i + 1}</span>
                        </td>
                        <td className="px-6 py-5 text-center font-medium text-slate-200">{user.name}</td>
                        <td className="px-6 py-5 text-center text-cyan-400 font-bold">{user.score}</td>
                        <td className="px-6 py-5 text-center text-slate-500">{user.lastAchieved.toLocaleTimeString()} – {user.lastAchieved.toLocaleDateString()}</td>
                      </tr>
                    );
                  }
                })}

              </tbody>
            </table>
          </div>
        </div>

      </main>
    </>
  );
}