"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Segment = "b2c" | "b2b";

const B2C_PLANS = [
  {
    name: "Pay Per Play",
    tag: "CASUAL",
    price: "Rp 5.000",
    unit: "/ play",
    color: "#4fc7bd",
    shadow: "#2a8a82",
    features: [
      "Beli energi secara bijian",
      "Tanpa komitmen langganan",
      "Akses 1 sesi simulasi lengkap",
      "Cocok untuk coba-coba dulu",
      "Tidak ada pemborosan biaya",
    ],
    cta: "Beli Energi",
  },
  {
    name: "Premium",
    tag: "BEST VALUE",
    price: "Rp 49.000",
    unit: "/ bulan",
    color: "#f6c85f",
    shadow: "#b17732",
    featured: true,
    features: [
      "Akses simulasi unlimited",
      "Semua divisi terbuka",
      "Sertifikat premium eksklusif",
      "Statistik performa detail",
      "Prioritas fitur baru",
      "Badge profil premium",
    ],
    cta: "Langganan Sekarang",
  },
];

const B2B_PLANS = [
  {
    name: "Recruiter Sub",
    tag: "HRD MAGANG",
    price: "Rp 299.000",
    unit: "/ bulan",
    color: "#a78bfa",
    shadow: "#6d28d9",
    features: [
      "Akses data calon pegawai potensial",
      "Filter kandidat berdasarkan skill",
      "Laporan performa peserta magang",
      "Dashboard analytics rekrutmen",
      "Integrasi dengan sistem HRD",
      "Support email prioritas",
    ],
    cta: "Mulai Rekrut",
  },
  {
    name: "Corporate",
    tag: "ENTERPRISE",
    price: "Custom",
    unit: "/ kontrak",
    color: "#fb923c",
    shadow: "#c2410c",
    featured: true,
    features: [
      "Simulasi kerja kustom perusahaan",
      "Corporate onboarding scenario",
      "Employer branding integration",
      "Skenario & divisi sesuai kebutuhan",
      "Dedicated account manager",
      "SLA & support premium 24/7",
    ],
    cta: "Hubungi Sales",
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [segment, setSegment] = useState<Segment>("b2c");

  const plans = segment === "b2c" ? B2C_PLANS : B2B_PLANS;

  return (
    <main className="min-h-screen bg-[#35131f] px-4 py-10 text-[#fff1c9]">
      {/* Header */}
      <section className="mx-auto max-w-4xl text-center">
        <button
          type="button"
          className="mb-6 border-3 border-[#241922] bg-[#54202f] px-4 py-2 text-[10px] font-black text-[#fff1c9] shadow-[3px_3px_0_#180b11] transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          onClick={() => router.push("/dashboard")}
        >
          ← KEMBALI
        </button>

        <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-2xl border-3 border-[#241922] bg-[#54202f] p-3 shadow-[4px_4px_0_#180b11]">
          <img
            src="/branding/magangsim-logo.png"
            alt="Logo MAGANG SIM"
            className="h-full w-full object-contain"
          />
        </div>

        <p className="text-[10px] font-black tracking-[0.25em] text-[#f6c85f]">
          MAGANG SIM
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-tight text-[#fff1c9] drop-shadow-[3px_3px_0_#1c0a10] md:text-3xl">
          Produk Berbayar
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-[10px] leading-5 text-[#ffe9b2]">
          Pilih paket yang sesuai kebutuhanmu. Individu atau korporasi,
          semuanya dirancang untuk pengalaman magang terbaik.
        </p>
      </section>

      {/* Segment Toggle */}
      <section className="mx-auto mt-8 max-w-4xl">
        <div className="mx-auto grid max-w-sm grid-cols-2 gap-3">
          <button
            type="button"
            className={`border-3 border-[#241922] px-3 py-2.5 text-[10px] font-black shadow-[3px_3px_0_#c49a78] transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#241922] active:scale-95 ${
              segment === "b2c"
                ? "bg-[#4fc7bd] text-[#241922]"
                : "bg-[#f4dfbe] text-[#241922]"
            }`}
            onClick={() => setSegment("b2c")}
          >
            👤 INDIVIDU (B2C)
          </button>

          <button
            type="button"
            className={`border-3 border-[#241922] px-3 py-2.5 text-[10px] font-black shadow-[3px_3px_0_#c49a78] transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#241922] active:scale-95 ${
              segment === "b2b"
                ? "bg-[#4fc7bd] text-[#241922]"
                : "bg-[#f4dfbe] text-[#241922]"
            }`}
            onClick={() => setSegment("b2b")}
          >
            🏢 KORPORASI (B2B)
          </button>
        </div>

        {/* Segment Description */}
        <div className="mx-auto mt-5 max-w-lg border-3 border-[#241922] bg-[#54202f] p-4 text-center shadow-[4px_4px_0_#180b11]">
          {segment === "b2c" ? (
            <p className="text-[10px] leading-5 text-[#ffe9b2]">
              <span className="font-black text-[#4fc7bd]">B2C</span> — Untuk
              pelajar, mahasiswa, dan pencari kerja yang ingin mengasah skill
              lewat simulasi magang interaktif.
            </p>
          ) : (
            <p className="text-[10px] leading-5 text-[#ffe9b2]">
              <span className="font-black text-[#a78bfa]">B2B</span> — Untuk
              HRD, perusahaan, dan institusi yang ingin merekrut atau
              membangun onboarding kustom lewat simulasi.
            </p>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative border-4 border-[#241922] bg-[#fff8e5] p-6 text-[#241922] shadow-[8px_8px_0_#180b11] transition-all duration-200 md:p-8 ${
              plan.featured
                ? "scale-[1.02] md:scale-105"
                : ""
            }`}
          >
            {/* Tag */}
            <span
              className="inline-block border-3 border-[#241922] px-3 py-1 text-[9px] font-black text-[#241922]"
              style={{ backgroundColor: plan.color }}
            >
              {plan.tag}
            </span>

            {/* Plan name */}
            <h3 className="mt-3 text-lg font-black tracking-tight">
              {plan.name}
            </h3>

            {/* Price */}
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-black">{plan.price}</span>
              <span className="text-[10px] font-black text-[#7f6669]">
                {plan.unit}
              </span>
            </div>

            {/* Divider */}
            <div className="my-4 h-[3px] bg-[#241922]" />

            {/* Features */}
            <ul className="grid gap-2.5">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-[10px] leading-4"
                >
                  <span
                    className="mt-0.5 inline-block h-3 w-3 shrink-0 border-2 border-[#241922]"
                    style={{ backgroundColor: plan.color }}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              type="button"
              className="mt-6 w-full border-3 border-[#241922] px-4 py-3 text-[10px] font-black transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                backgroundColor: plan.color,
                boxShadow: `4px 4px 0 ${plan.shadow}`,
              }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </section>

      {/* Layanan Khusus Section */}
      <section className="mx-auto mt-12 max-w-4xl">
        <div className="border-4 border-[#241922] bg-gradient-to-br from-[#6a2b3e] to-[#3a1421] p-6 text-center shadow-[8px_8px_0_#180b11] md:p-10">
          <span className="inline-block border-3 border-[#241922] bg-[#fb923c] px-3 py-1 text-[9px] font-black text-[#241922]">
            LAYANAN KHUSUS
          </span>

          <h2 className="mt-4 text-lg font-black tracking-tight text-[#fff1c9] drop-shadow-[2px_2px_0_#1c0a10] md:text-xl">
            Corporate Onboarding &amp; Employer Branding
          </h2>

          <p className="mx-auto mt-3 max-w-md text-[10px] leading-5 text-[#ffe9b2]">
            Perusahaan dapat membuat simulasi kerja sesuai kebutuhan internal
            dengan biaya khusus. Cocok untuk memperkuat branding dan proses
            onboarding melalui simulasi yang disesuaikan.
          </p>

          <div className="mx-auto mt-6 grid max-w-lg gap-3 text-left md:grid-cols-2">
            {[
              "Simulasi kustom sesuai kultur perusahaan",
              "Skenario onboarding yang realistis",
              "Employer branding lewat gamifikasi",
              "Laporan & analytics mendalam",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 border-2 border-[#ffffff20] bg-[#ffffff10] px-3 py-2.5"
              >
                <span className="mt-0.5 inline-block h-3 w-3 shrink-0 border-2 border-[#241922] bg-[#fb923c]" />
                <span className="text-[10px] leading-4 text-[#ffe9b2]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-6 border-3 border-[#241922] bg-[#fb923c] px-6 py-3 text-[10px] font-black text-[#241922] shadow-[4px_4px_0_#c2410c] transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5 hover:bg-[#fdba74] hover:shadow-[6px_6px_0_#241922] active:scale-[0.98]"
          >
            Konsultasi Gratis →
          </button>
        </div>
      </section>

      {/* Kenapa Magang Sim Section */}
      <section className="mx-auto mt-12 max-w-4xl">
        <h2 className="text-center text-lg font-black tracking-tight text-[#fff1c9] drop-shadow-[2px_2px_0_#1c0a10]">
          Kenapa Magang Sim?
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: "🎯",
              title: "Segmentasi Jelas",
              desc: "Produk dirancang tepat sasaran untuk B2C dan B2B dengan kebutuhan yang berbeda.",
              color: "#4fc7bd",
            },
            {
              icon: "📈",
              title: "Mendukung Pendapatan",
              desc: "Model bisnis multi-revenue stream dari pay per play, langganan, hingga enterprise.",
              color: "#f6c85f",
            },
            {
              icon: "🤝",
              title: "Integrasi Mudah",
              desc: "Koordinasi dengan tim pengembang untuk integrasi yang mulus dengan platform.",
              color: "#a78bfa",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border-3 border-[#241922] bg-[#fff8e5] p-5 text-center text-[#241922] shadow-[5px_5px_0_#180b11]"
            >
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-2 text-xs font-black">{item.title}</h3>
              <p className="mt-2 text-[10px] leading-4 text-[#5f4a4d]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Notes */}
      <section className="mx-auto mt-12 max-w-4xl border-t-3 border-[#ffffff20] pt-6 text-center">
        <p className="text-[9px] leading-5 text-[#7f6669]">
          Halaman ini merupakan pusat informasi dan penjualan untuk semua
          produk berbayar Magang Sim. Harga dan fitur dapat berubah sewaktu-waktu.
        </p>
        <p className="mt-2 text-[9px] text-[#7f6669]">
          © 2026 Magang Sim • Simulasi Magang Interaktif
        </p>
        <p className="mt-4 tracking-[0.4em] text-[#f6c85f]">✦ ✦ ✦</p>
      </section>
    </main>
  );
}
