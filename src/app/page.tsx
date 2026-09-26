"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setMessage("Email dan password harus diisi.");
      return;
    }

    if (password.length < 4) {
      setMessage("Password minimal 4 karakter.");
      return;
    }

    if (mode === "signup" && !name.trim()) {
      setMessage("Isi nama pemain terlebih dahulu.");
      return;
    }

    const playerName = mode === "signup" ? name.trim() : "Intern";

    localStorage.setItem(
      "magangsim-player",
      JSON.stringify({
        name: playerName,
        email,
        guest: false,
      }),
    );

    router.push("/dashboard");
  }

  function playAsGuest() {
    localStorage.setItem(
      "magangsim-player",
      JSON.stringify({
        name: "Tamu",
        email: "guest@magangsim.local",
        guest: true,
      }),
    );

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#35131f] text-[#fff1c9] md:h-screen md:overflow-hidden">
      <section className="grid w-full bg-[#35131f] md:h-full md:grid-cols-2">
        <aside className="flex min-h-screen md:min-h-full flex-col items-center justify-center border-b-4 border-[#241922] bg-gradient-to-br from-[#6a2b3e] to-[#3a1421] p-10 text-center text-[#fff7df] md:border-b-0 md:border-r-4">
          <div className="mb-6 grid h-52 w-52 place-items-center rounded-3xl border-4 border-[#180b11] bg-[#35131f] p-5 shadow-[8px_8px_0_rgba(0,0,0,0.25)]">
            <img
              src="/branding/magangsim-logo.png"
              alt="Logo MAGANG SIM"
              className="h-full w-full object-contain"
            />
          </div>

          <h1 className="text-4xl tracking-tighter text-[#fff1c9] drop-shadow-[4px_4px_0_#1c0a10]" style={{ fontFamily: "var(--font-press-start)" }}>
            MAGANG SIM
          </h1>

          <p className="mt-4 max-w-sm text-sm leading-6 text-[#ffe9b2]">
            Belajar, bekerja, dan berkembang dalam petualangan magang
            pertamamu.
          </p>

          <p className="mt-5 tracking-[0.4em] text-[#f6c85f]">✦ ✦ ✦</p>
        </aside>

        <section className="flex min-h-screen md:min-h-full flex-col justify-center p-8 md:p-20 md:overflow-y-auto">
          <h2 className="text-3xl font-black">
            {mode === "login" ? "Masuk ke kantor" : "Buat identitas intern"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#5f4a4d]">
            {mode === "login"
              ? "Lanjutkan perjalanan magangmu dan selesaikan objective hari ini."
              : "Buat profil untuk menyimpan perjalanan magangmu."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className={`border-3 border-[#241922] text-[#241922] px-3 py-2 font-black shadow-[3px_3px_0_#c49a78] transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#241922] active:scale-95 ${
                mode === "login" ? "bg-[#4fc7bd]" : "bg-[#f4dfbe]"
              }`}
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
            >
              Masuk
            </button>

            <button
              type="button"
              className={`border-3 border-[#241922] text-[#241922] px-3 py-2 font-black shadow-[3px_3px_0_#c49a78] transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#241922] active:scale-95 ${
                mode === "signup" ? "bg-[#4fc7bd]" : "bg-[#f4dfbe]"
              }`}
              onClick={() => {
                setMode("signup");
                setMessage("");
              }}
            >
              Buat Akun
            </button>
          </div>

          <form className="mt-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <label className="mb-4 grid gap-2 text-xs font-black">
                NAMA PEMAIN
                <input
                  className="border-3 border-[#241922] bg-white text-[#241922] px-3 py-3 outline-none transition-shadow duration-200 focus:shadow-[4px_4px_0_#4fc7bd]"
                  placeholder="Contoh: Rani"
                  maxLength={20}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
            )}

            <label className="mb-4 grid gap-2 text-xs font-black">
              EMAIL
              <input
                className="border-3 border-[#241922] bg-white text-[#241922] px-3 py-3 outline-none transition-shadow duration-200 focus:shadow-[4px_4px_0_#4fc7bd]"
                type="email"
                placeholder="kamu@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label className="grid gap-2 text-xs font-black">
              PASSWORD
              <input
                className="border-3 border-[#241922] bg-white text-[#241922] px-3 py-3 outline-none transition-shadow duration-200 focus:shadow-[4px_4px_0_#4fc7bd]"
                type="password"
                placeholder="Minimal 4 karakter"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            <button
              type="submit"
              className="mt-5 w-full border-3 border-[#241922] bg-[#f6c85f] text-[#241922] px-4 py-3 font-black shadow-[4px_4px_0_#b17732] transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5 hover:bg-[#fbd373] hover:shadow-[6px_6px_0_#241922] active:scale-[0.98]"
            >
              {mode === "login" ? "Masuk" : "Buat Akun"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-[#7f6669] before:h-[2px] before:flex-1 before:bg-[#cdb9a0] after:h-[2px] after:flex-1 after:bg-[#cdb9a0]">
            ATAU
          </div>

          <button
            type="button"
            className="w-full border-3 border-[#241922] bg-white text-[#241922] px-4 py-3 font-black shadow-[3px_3px_0_#cdb9a0] transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5 hover:bg-[#fff0b8] hover:shadow-[6px_6px_0_#241922] active:scale-[0.98]"
            onClick={playAsGuest}
          >
            Main sebagai Tamu
          </button>

          <p className="mt-4 min-h-5 text-xs font-bold text-[#ad2439]">
            {message}
          </p>


        </section>
      </section>
    </main>
  );
}