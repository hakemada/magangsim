"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type PlayerProfile = {
  name: string;
  email: string;
  guest: boolean;
};

import { DivisionId } from "../../data/types";

type SavedProgress = {
  divisionId: DivisionId | null;
  sessionEnergy: number;
  completedSessions: number;
  sessionActive: boolean;
  sessionSecondsLeft: number;
  challengeIndex: number;
  skill: number;
  reputation: number;
  pantryUsedToday: boolean;
  storySeen: boolean;
  currentDay?: number;
  lastEnergyDate?: string;
  correctMultipleChoiceCount?: number;
  passedWrittenCount?: number;
};

type DivisionInfo = {
  name: string;
  skillName: string;
  color: string;
  description: string;
  expertName: string;
  expertRole: string;
  expertInstitution: string;
  standardCode: string;
  dailyActivities: string[];
  careerPaths: string[];
};

const DIVISIONS: Record<DivisionId, DivisionInfo> = {
  accounting: {
    name: "Akuntansi",
    skillName: "Ketelitian",
    color: "#93c5fd",
    description:
      "Memeriksa transaksi, menjaga akurasi data, dan mendukung keputusan berbasis laporan keuangan.",
    expertName: "Drs. Hendra Wijaya, CPA",
    expertRole: "Validator Ahli Akuntansi & Audit Internal",
    expertInstitution: "Komite Standar Praktisi Keuangan Nusantara",
    standardCode: "SKM-FIN-2026",
    dailyActivities: [
      "Mencocokkan nominal invoice tagihan dengan mutasi & bukti pembayaran harian.",
      "Menyusun rekonsiliasi kas serta menandai transaksi yang belum memiliki bukti lengkap.",
      "Menganalisis kenaikan biaya operasional dan menyusun rekomendasi efisiensi bagi manajemen.",
    ],
    careerPaths: [
      "Junior Staff Accounting / Finance Operations",
      "Internal Audit & Verification Associate",
      "Accounts Payable / Receivable Specialist",
    ],
  },
  marketing: {
    name: "Digital Marketing",
    skillName: "Kreativitas",
    color: "#f9a8d4",
    description:
      "Membuat campaign, memahami audiens, menguji ide konten, dan mengukur hasil pemasaran digital.",
    expertName: "Nadia Kusuma, M.M.",
    expertRole: "Validator Ahli Digital Campaign & Brand Strategy",
    expertInstitution: "Dewan Sertifikasi Praktisi Pemasaran Digital",
    standardCode: "SKM-MKT-2026",
    dailyActivities: [
      "Menganalisis perilaku target audiens dan menulis skrip/caption iklan dengan Call to Action jelas.",
      "Merancang eksperimen A/B testing untuk mengoptimalkan klik (CTR) dan engagement konten.",
      "Menyusun creative brief terstruktur bagi tim desainer visual dan content creator.",
    ],
    careerPaths: [
      "Social Media & Content Marketing Specialist",
      "Digital Campaign & Performance Executive",
      "Creative Copywriter & Brand Associate",
    ],
  },
  hr: {
    name: "Human Resource",
    skillName: "Komunikasi",
    color: "#86efac",
    description:
      "Mendukung rekrutmen, onboarding, komunikasi kandidat, dan pengalaman karyawan.",
    expertName: "Raka Pratama, S.Psi., CHRP",
    expertRole: "Validator Ahli People Operations & Talent Acquisition",
    expertInstitution: "Asosiasi Sertifikasi Profesi Sumber Daya Manusia",
    standardCode: "SKM-HRD-2026",
    dailyActivities: [
      "Menyaring kandidat berdasarkan kesesuaian kompetensi peran dan kebutuhan tim.",
      "Menyiapkan jadwal onboarding, dokumen kerja, serta pendampingan hari pertama karyawan baru.",
      "Mengelola komunikasi status seleksi secara empatik dan menjaga kerahasiaan data kandidat.",
    ],
    careerPaths: [
      "Talent Acquisition / Recruitment Officer",
      "People Operations & Onboarding Associate",
      "Employer Branding & Employee Experience Staff",
    ],
  },
};

function formatCertificateDate() {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function makeCertificateId(
  playerName: string,
  divisionId: DivisionId,
  reputation: number,
) {
  const initials =
    playerName
      .split(" ")
      .filter(Boolean)
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 3) || "PES";

  const divisionCode =
    divisionId === "accounting"
      ? "ACC"
      : divisionId === "marketing"
        ? "MKT"
        : "HRD";

  const scoreCode = String(reputation).padStart(2, "0");

  return `MS-${divisionCode}-${initials}-${scoreCode}-2026`;
}

export default function ResultPage() {
  const router = useRouter();

  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [progress, setProgress] = useState<SavedProgress | null>(null);

  useEffect(() => {
    const savedPlayer = localStorage.getItem("magangsim-player");
    const savedProgress = localStorage.getItem("magangsim-session-progress");

    if (!savedPlayer || !savedProgress) {
      router.replace("/play");
      return;
    }

    const parsedProgress = JSON.parse(savedProgress) as SavedProgress;

    if (
      !parsedProgress.divisionId ||
      !Object.prototype.hasOwnProperty.call(
        DIVISIONS,
        parsedProgress.divisionId,
      )
    ) {
      router.replace("/play");
      return;
    }

    if (parsedProgress.completedSessions < 21) {
      router.replace("/play");
      return;
    }

    setPlayer(JSON.parse(savedPlayer) as PlayerProfile);
    setProgress(parsedProgress);
  }, [router]);

  const result = useMemo(() => {
    if (!player || !progress || !progress.divisionId) {
      return null;
    }

    const division = DIVISIONS[progress.divisionId];

    const badge =
      progress.reputation >= 25
        ? {
            title: "Magang Teladan",
            icon: "★",
            color: "#f6c85f",
            description:
              "Kamu menunjukkan keputusan yang kuat, komunikasi yang baik, dan konsistensi selama simulasi magang.",
          }
        : progress.reputation >= 15
          ? {
              title: "Magang Andal",
              icon: "◆",
              color: "#93c5fd",
              description:
                "Kamu telah menyelesaikan orientasi dengan hasil yang baik dan memiliki fondasi kompetensi yang menjanjikan.",
            }
          : {
              title: "Magang Pemula",
              icon: "●",
              color: "#86efac",
              description:
                "Kamu telah menyelesaikan orientasi awal. Terus berlatih agar kemampuan dan kualitas keputusanmu semakin meningkat.",
            };

    const mcCorrect =
      progress.correctMultipleChoiceCount ??
      Math.min(6, Math.max(2, Math.round(progress.reputation / 5)));
    const writtenPassed =
      progress.passedWrittenCount ??
      Math.min(3, Math.max(1, Math.round(progress.reputation / 9)));

    const readinessScore = Math.min(
      100,
      Math.max(
        45,
        Math.round(
          (progress.reputation / 30) * 65 +
            (progress.skill / 3) * 20 +
            (progress.sessionEnergy / 3) * 15,
        ),
      ),
    );

    const readinessLevel =
      readinessScore >= 85
        ? {
            label: "Siap Terjun ke Dunia Kerja / Magang Industri",
            summary:
              "Berdasarkan evaluasi validator ahli, kamu sangat memahami alur kerja harian dan mampu menyusun output praktis sesuai standar profesional.",
          }
        : readinessScore >= 70
          ? {
              label: "Siap Magang dengan Pendampingan Mentor",
              summary:
                "Kamu sudah menguasai konsep dasar dan alur kerja harian bidang ini. Tingkatkan ketajaman pada detail tugas tertulis agar makin mandiri.",
            }
          : {
              label: "Tahap Eksplorasi Minat & Penguatan Fondasi",
              summary:
                "Simulasi ini memberikan gambaran awal aktivitas kerja. Kamu disarankan mengulang skenario untuk memperkuat pengambilan keputusan praktis.",
            };

    return {
      division,
      badge,
      mcCorrect,
      writtenPassed,
      readinessScore,
      readinessLevel,
      certificateId: makeCertificateId(
        player.name,
        progress.divisionId,
        progress.reputation,
      ),
      completionDate: formatCertificateDate(),
    };
  }, [player, progress]);

  function resetGame() {
    localStorage.removeItem("magangsim-session-progress");
    localStorage.removeItem("magangsim-progress");
    localStorage.removeItem("magangsim-selected-division");
    localStorage.removeItem("magangsim-first-task-done");

    router.push("/play");
  }

  function printCertificate() {
    window.print();
  }

  if (!player || !progress || !result) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#35131f] px-4 text-center text-[#fff1c9]">
        Memuat sertifikat MAGANG SIM...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#35131f] px-4 py-8 text-[#241922] print:bg-white print:p-0">
      <section className="mx-auto w-full max-w-4xl">
        <div className="mb-5 flex flex-col items-center gap-3 print:hidden">
          <img
            src="/branding/magangsim-logo.png"
            alt="Logo MAGANG SIM"
            className="h-14 w-14 object-contain"
          />

          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="border-3 border-[#241922] bg-[#93c5fd] px-5 py-3 font-black shadow-[4px_4px_0_#4b76a6] transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:bg-[#bfdbfe] hover:shadow-[6px_6px_0_#241922] active:scale-95"
              onClick={() => router.push("/play")}
            >
              ← Kembali ke Game
            </button>

            <button
              className="border-3 border-[#241922] bg-[#f6c85f] px-5 py-3 font-black shadow-[4px_4px_0_#b17732] transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:bg-[#fbd373] hover:shadow-[6px_6px_0_#241922] active:scale-95"
              onClick={printCertificate}
            >
              Cetak Sertifikat Mutu
            </button>

            <button
              className="border-3 border-[#241922] bg-[#f9a8d4] px-5 py-3 font-black shadow-[4px_4px_0_#a74f7a] transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:bg-[#fbcfe8] hover:shadow-[6px_6px_0_#241922] active:scale-95"
              onClick={resetGame}
            >
              Coba Divisi Lain / Ulang Magang
            </button>
          </div>
        </div>

        <article className="border-4 border-[#241922] bg-[#fff8e5] p-5 shadow-[10px_10px_0_#180b11] print:border-4 print:bg-white print:shadow-none md:p-8">
          <div className="flex flex-col items-center">
            <img
              src="/branding/magangsim-logo.png"
              alt="Logo MAGANG SIM"
              className="h-20 w-20 object-contain"
            />

            <p className="mt-3 text-center text-xs font-black tracking-[0.28em] text-[#7c3146]">
              MAGANG SIM • SERTIFIKASI MUTU KOMPETENSI
            </p>
          </div>

          <h1 className="mt-3 text-center text-3xl font-black md:text-4xl">
            Sertifikat Kompetensi & Simulasi Kerja
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-[#5f4a4d]">
            Diberikan kepada peserta yang telah menyelesaikan rangkaian
            simulasi pekerjaan berdurasi terstruktur, pengambilan keputusan
            skenario nyata, dan tugas uraian praktis pada program pelatihan
            MAGANG SIM.
          </p>

          <div
            className="mt-7 border-4 border-[#241922] p-5 text-center shadow-[5px_5px_0_#b17732]"
            style={{ backgroundColor: result.badge.color }}
          >
            <span className="block text-6xl leading-none">
              {result.badge.icon}
            </span>

            <p className="mt-3 text-xs font-black tracking-[0.2em]">
              BADGE KOMPETENSI • STANDAR {result.division.standardCode}
            </p>

            <h2 className="mt-1 text-2xl font-black">
              {result.badge.title}
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6">
              {result.badge.description}
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm font-bold text-[#5f4a4d]">
              Dengan bangga diberikan kepada
            </p>

            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              {player.name}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6">
              Telah menyelesaikan simulasi magang pada jalur{" "}
              <b>{result.division.name}</b> melalui tiga sesi pembelajaran
              bertahap (Dasar, Menengah, Lanjutan) berbasis skenario kerja nyata.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div
              className="border-4 border-[#241922] p-4"
              style={{ backgroundColor: result.division.color }}
            >
              <p className="text-xs font-black tracking-[0.1em]">
                POSISI MAGANG
              </p>

              <p className="mt-2 text-xl font-black">
                {result.division.name}
              </p>

              <p className="mt-2 text-xs leading-5">
                {result.division.description}
              </p>
            </div>

            <div className="border-4 border-[#241922] bg-white p-4">
              <p className="text-xs font-black tracking-[0.1em]">
                SKILL UTAMA
              </p>

              <p className="mt-2 text-xl font-black">
                {result.division.skillName}: {progress.skill}/3
              </p>

              <p className="mt-2 text-xs leading-5 text-[#5f4a4d]">
                Skill meningkat melalui penyelesaian tiga sesi challenge bertahap.
              </p>
            </div>

            <div className="border-4 border-[#241922] bg-white p-4">
              <p className="text-xs font-black tracking-[0.1em]">
                REPUTASI & SKOR KEPUTUSAN
              </p>

              <p className="mt-2 text-xl font-black">
                {progress.reputation} Poin
              </p>

              <p className="mt-2 text-xs leading-5 text-[#5f4a4d]">
                Mencerminkan ketepatan analisis kasus dan kualitas tugas uraian praktis.
              </p>
            </div>

            <div className="border-4 border-[#241922] bg-white p-4">
              <p className="text-xs font-black tracking-[0.1em]">
                INDEKS KESIAPAN KERJA
              </p>

              <p className="mt-2 text-xl font-black">
                {result.readinessScore}% • {result.readinessLevel.label.split(" ")[0]}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#5f4a4d]">
                Sisa Energy Sesi: {progress.sessionEnergy}/3 • Selesai pada Hari ke-{progress.currentDay ?? 1}.
              </p>
            </div>
          </div>

          <div className="mt-8 border-4 border-[#241922] bg-white p-5 shadow-[5px_5px_0_#241922]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-3 border-[#241922] pb-3">
              <div>
                <p className="text-xs font-black tracking-[0.16em] text-[#7c3146]">
                  VALIDASI MUTU & RUBRIK KOMPETENSI AHLI
                </p>
                <h3 className="mt-1 text-lg font-black">
                  Asesmen Standar Industri ({result.division.standardCode})
                </h3>
              </div>
              <span className="border-2 border-[#241922] bg-[#86efac] px-3 py-1 text-xs font-black">
                ✓ TERVALIDASI AHLI
              </span>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="border-3 border-[#241922] bg-[#fffdf7] p-3">
                <p className="text-xs font-black">1. KEPUTUSAN SKENARIO</p>
                <p className="mt-1 text-lg font-black">
                  {result.mcCorrect}/6 Tepat
                </p>
                <p className="mt-1 text-xs leading-5 text-[#5f4a4d]">
                  Ketepatan memilih tindakan profesional pada studi kasus harian.
                </p>
              </div>

              <div className="border-3 border-[#241922] bg-[#fffdf7] p-3">
                <p className="text-xs font-black">2. TUGAS URAIAN PRAKTIS</p>
                <p className="mt-1 text-lg font-black">
                  {result.writtenPassed}/3 Memenuhi Standar
                </p>
                <p className="mt-1 text-xs leading-5 text-[#5f4a4d]">
                  Kemampuan menyusun dokumen/skrip kerja aplikatif sesuai konteks.
                </p>
              </div>

              <div className="border-3 border-[#241922] bg-[#fffdf7] p-3">
                <p className="text-xs font-black">3. MANAJEMEN FOKUS & ENERGI</p>
                <p className="mt-1 text-lg font-black">
                  {progress.sessionEnergy}/3 Energy Sesi
                </p>
                <p className="mt-1 text-xs leading-5 text-[#5f4a4d]">
                  Pengelolaan sesi kerja 7 menit dan pemanfaatan waktu istirahat.
                </p>
              </div>
            </div>

            <div className="mt-4 border-3 border-[#241922] bg-[#fff0b8] p-3 text-xs leading-5">
              <b>Catatan Validator Ahli ({result.division.expertName}):</b>{" "}
              {result.readinessLevel.summary}
            </div>
          </div>

          <div className="mt-6 border-4 border-[#241922] bg-[#e6f4ff] p-5 print:hidden">
            <p className="text-xs font-black tracking-[0.16em] text-[#1e3a8a]">
              GAMBARAN KERJA NYATA & PEMETAAN MINAT KARIER
            </p>
            <h3 className="mt-1 text-lg font-black">
              Aktivitas Sehari-hari di Bidang {result.division.name}
            </h3>
            <p className="mt-1 text-xs leading-5 text-[#475569]">
              Simulasi yang baru kamu jalani merepresentasikan tugas nyata berikut di industri. Gunakan gambaran ini untuk menilai kecocokan minat dan kesiapan kariermu:
            </p>

            <ul className="mt-3 grid gap-2 text-xs leading-5">
              {result.division.dailyActivities.map((activity) => (
                <li
                  key={activity}
                  className="border-2 border-[#241922] bg-white px-3 py-2 font-bold"
                >
                  • {activity}
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t-2 border-[#241922] pt-3">
              <p className="text-xs font-black">
                REKOMENDASI POSISI KARIER / MAGANG YANG SESUAI:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.division.careerPaths.map((role) => (
                  <span
                    key={role}
                    className="border-2 border-[#241922] bg-[#f6c85f] px-3 py-1 text-xs font-black"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t-3 border-[#241922] pt-5 text-center">
            <p className="text-sm font-bold">
              Program selesai: {result.completionDate}
            </p>

            <p className="mt-2 text-xs text-[#5f4a4d]">
              ID Sertifikat:{" "}
              <span className="font-black">{result.certificateId}</span> • Kode Standar:{" "}
              <span className="font-black">{result.division.standardCode}</span>
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-[#5f4a4d]">
              Sertifikat ini diterbitkan sebagai bukti penguasaan simulasi kerja praktis MAGANG SIM dengan kurikulum skenario yang divalidasi oleh praktisi ahli bidang {result.division.name}.
            </p>
          </div>

          <div className="mt-8 grid gap-4 text-center sm:grid-cols-3">
            <div className="border-t-3 border-[#241922] pt-3">
              <p className="text-xs font-black">PESERTA</p>
              <p className="mt-4 text-sm font-bold">{player.name}</p>
              <p className="text-[11px] text-[#5f4a4d]">Intern Nusantara Works</p>
            </div>

            <div className="border-t-3 border-[#241922] pt-3">
              <p className="text-xs font-black">MENTOR SIMULASI</p>
              <p className="mt-4 text-sm font-bold">Maya • MAGANG SIM</p>
              <p className="text-[11px] text-[#5f4a4d]">Koordinator Orientasi</p>
            </div>

            <div className="border-t-3 border-[#241922] pt-3">
              <p className="text-xs font-black">VALIDATOR AHLI</p>
              <p className="mt-4 text-sm font-bold">{result.division.expertName}</p>
              <p className="text-[11px] text-[#5f4a4d]">{result.division.expertInstitution}</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}