"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type PlayerProfile = {
  name: string;
  email: string;
  guest: boolean;
};

export default function DashboardPage() {
  const router = useRouter();
  const [player, setPlayer] = useState<PlayerProfile | null>(null);

  useEffect(() => {
    const savedPlayer = localStorage.getItem("magangsim-player");

    if (!savedPlayer) {
      router.replace("/");
      return;
    }

    setPlayer(JSON.parse(savedPlayer) as PlayerProfile);
  }, [router]);

  function logout() {
    localStorage.removeItem("magangsim-player");
    localStorage.removeItem("magangsim-progress");
    localStorage.removeItem("magangsim-session-progress");
    localStorage.removeItem("magangsim-selected-division");
    localStorage.removeItem("magangsim-first-task-done");

    router.replace("/");
  }

  function resetProgress() {
    localStorage.removeItem("magangsim-progress");
    localStorage.removeItem("magangsim-session-progress");
    localStorage.removeItem("magangsim-selected-division");
    localStorage.removeItem("magangsim-first-task-done");

    alert("Progres magang berhasil direset.");
  }

  if (!player) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#35131f] text-[#fff1c9]">
        Memuat profil intern...
      </main>
    );
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#35131f] px-4 py-8 text-[#241922]">
      <section className="w-full max-w-xl border-4 border-[#241922] bg-[#fff8e5] p-8 text-center shadow-[10px_10px_0_#180b11] md:p-12">
        <div className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-2xl border-3 border-[#241922] bg-[#54202f] p-3 shadow-[4px_4px_0_#180b11]">
          <img
            src="/branding/magangsim-logo.png"
            alt="Logo MAGANG SIM"
            className="h-full w-full object-contain"
          />
        </div>

        <p className="text-xs font-black tracking-[0.2em] text-[#7c3146]">
          MAGANG SIM
        </p>

        <h1 className="mt-2 text-4xl font-black tracking-tighter">
          Halo, {player.name}!
        </h1>

        <p className="mt-4 text-sm leading-6 text-[#5f4a4d]">
          Hari pertamamu sebagai intern siap dimulai. Temui Maya di lobby untuk
          menerima orientasi dan tugas pertamamu.
        </p>

        <div className="mt-7 grid gap-3.5">
          <button
            type="button"
            className="border-3 border-[#241922] bg-[#f6c85f] px-4 py-3 font-black shadow-[4px_4px_0_#b17732] transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5 hover:bg-[#fbd373] hover:shadow-[6px_6px_0_#241922] active:scale-[0.98]"
            onClick={() => router.push("/play")}
          >
            Mulai Game
          </button>

          <button
            type="button"
            className="border-3 border-[#241922] bg-white px-4 py-3 font-black shadow-[4px_4px_0_#cdb9a0] transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5 hover:bg-[#fff0b8] hover:shadow-[6px_6px_0_#241922] active:scale-[0.98]"
            onClick={resetProgress}
          >
            Mulai Ulang Magang
          </button>

          <button
            type="button"
            className="border-3 border-[#241922] bg-[#a78bfa] px-4 py-3 font-black shadow-[4px_4px_0_#6d28d9] transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5 hover:bg-[#c4b5fd] hover:shadow-[6px_6px_0_#241922] active:scale-[0.98]"
            onClick={() => router.push("/pricing")}
          >
            💎 Produk Berbayar
          </button>

          <button
            type="button"
            className="border-3 border-[#241922] bg-[#fda4af] px-4 py-3 font-black shadow-[4px_4px_0_#9f1239] transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5 hover:bg-[#fecdd3] hover:shadow-[6px_6px_0_#241922] active:scale-[0.98]"
            onClick={logout}
          >
            Keluar
          </button>
        </div>

        <p className="mt-6 text-[10px] leading-5 text-[#7f6669]">
          Mode: {player.guest ? "Tamu" : "Profil lokal"} • Progres disimpan di
          browser ini.
        </p>
      </section>
    </main>
  );
}