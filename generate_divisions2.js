const fs = require("fs");
const path = require("path");

const accountingTopics = [
  "Pengecekan Bukti Kas Masuk", "Verifikasi Faktur Penjualan", "Pencatatan Biaya ATK",
  "Rekonsiliasi Bank BCA", "Pengecekan Selisih Kas Kecil", "Validasi Reimbursement Karyawan",
  "Pencatatan Depresiasi Aset", "Perhitungan Biaya Overhead", "Pencatatan Pendapatan Diterima di Muka",
  "Verifikasi Hutang Usaha", "Audit Stok Opname Gudang", "Penyesuaian Saldo Asuransi",
  "Penjumlahan Tagihan Vendor (Excel SUM)", "Rata-rata Pengeluaran Bulanan (Excel AVERAGE)", "Pencarian Data Klien (Excel VLOOKUP)",
  "Total Biaya Per Divisi (Excel SUMIF)", "Hitung Jumlah Transaksi Gagal (Excel COUNTIF)", "Validasi Limit Kartu Kredit (Excel IF)",
  "Pencarian Harga Barang Gudang (Excel INDEX MATCH)", "Bonus Akhir Tahun Karyawan (Excel IFS)", "Cek Kelayakan Kredit Klien (Excel IF AND)"
];

const marketingTopics = [
  "Riset Tren Gen Z di TikTok", "Analisis Kompetitor Skincare", "Pembuatan Persona Audiens",
  "Evaluasi CTR Iklan Facebook", "A/B Testing Headline Email", "Optimasi Landing Page",
  "Manajemen KOL/Influencer", "Penulisan Copywriting IG Reels", "Analisis Bounce Rate Website",
  "Strategi Promo Flash Sale", "Pemilihan Keyword SEO", "Analisis CPC Google Ads",
  "Re-branding Logo Mikro", "Manajemen Krisis PR Twitter", "Strategi Partnership B2B",
  "Optimasi Budget Ads Bulanan", "Customer Journey Mapping", "Retention Strategy Membership",
  "Kampanye Peluncuran Produk Baru", "Analisis ROI Event Tahunan", "Strategi Marketing Internasional 360"
];

const hrTopics = [
  "Screening CV Fresh Graduate", "Onboarding Karyawan Baru", "Pembuatan Kontrak Kerja",
  "Wawancara Perilaku (Behavioral)", "Evaluasi Kinerja Tahunan", "Manajemen Cuti dan Absensi",
  "Mediasi Konflik Antar Karyawan", "Review Struktur Gaji", "Penyusunan KPI Divisi",
  "Survei Kepuasan Karyawan", "Penyelesaian Kasus Indisipliner", "Pelatihan Soft Skill Internal",
  "Analisis Turnover Karyawan", "Restrukturisasi Tim IT", "Negosiasi Kenaikan Gaji",
  "Penanganan Keluhan Pelecehan", "Prosedur PHK sesuai Regulasi", "Manajemen Asuransi Kesehatan",
  "Employer Branding di LinkedIn", "Strategi Retensi Talent Kunci", "Penanganan Krisis Moral Perusahaan"
];

function createDivisionFile(divisionId, name, skillName, description, deskLabel, color, mayaBriefing, topics, getChallenges) {
  const sessions = topics.map((topic, index) => {
    const day = Math.floor(index / 3) + 1;
    let difficulty = "Dasar";
    if (day >= 2 && day <= 4) difficulty = "Menengah";
    if (day == 5) difficulty = divisionId === "accounting" ? "Mudah (Excel)" : "Menengah-Atas";
    if (day == 6) difficulty = divisionId === "accounting" ? "Menengah (Excel)" : "Sulit";
    if (day == 7) difficulty = divisionId === "accounting" ? "Sulit (Excel)" : "Sangat Sulit";

    return {
      title: `Hari ${day} - Sesi ${index % 3 + 1}: ${topic}`,
      difficulty,
      challenges: getChallenges(index, topic, day, divisionId)
    };
  });

  const content = `import { Division } from "../types";

export const ${divisionId}Division: Division = {
  id: "${divisionId}",
  name: "${name}",
  skillName: "${skillName}",
  description: "${description}",
  deskLabel: "${deskLabel}",
  color: "${color}",
  mayaBriefing: ${JSON.stringify(mayaBriefing, null, 4)},
  sessions: ${JSON.stringify(sessions, null, 4)}
};
`;
  
  fs.writeFileSync(path.join(__dirname, "src/data/divisions", `${divisionId}.ts`), content);
}

// Accounting
createDivisionFile(
  "accounting", "Akuntansi", "Ketelitian",
  "Memeriksa transaksi, menjaga akurasi data, dan mendukung keputusan berbasis laporan keuangan.",
  "MEJA FINANCE", "#93c5fd",
  [
    "Di Akuntansi, angka bukan sekadar angka. Setiap nominal menceritakan aktivitas bisnis.",
    "Tugasmu adalah memastikan data dapat dipercaya sebelum tim mengambil keputusan.",
    "Mulai dari pemeriksaan sederhana, lalu biasakan menjelaskan alasan di balik keputusanmu."
  ],
  accountingTopics,
  (index, topic, day) => {
    let challenges = [];
    if (day < 5) {
      challenges = [
        {
          type: "multiple-choice",
          title: `Analisis: ${topic}`,
          scenario: `Kamu sedang melakukan tugas: ${topic}. Ada perbedaan data antara laporan dan bukti fisik sebesar Rp 150.000.`,
          question: "Apa tindakan pertama yang sesuai dengan SOP?",
          options: ["Abaikan selisih", "Tanyakan ke pihak terkait", "Langsung ubah data laporan", "Buat jurnal penyesuaian sepihak"],
          correctAnswer: 1,
          correctFeedback: "Benar, konfirmasi sangat penting sebelum mengubah data.",
          wrongFeedback: "Salah, kamu tidak boleh mengambil keputusan tanpa verifikasi pihak terkait."
        },
        {
          type: "multiple-choice",
          title: `Verifikasi ${topic}`,
          scenario: `Dalam proses ${topic}, dokumen tanggal 12 tidak ditemukan.`,
          question: "Langkah apa yang mencegah audit finding?",
          options: ["Minta salinan dokumen dari vendor", "Tulis 'hilang' di laporan", "Hapus baris transaksi", "Buat dokumen palsu"],
          correctAnswer: 0,
          correctFeedback: "Benar, meminta salinan sah adalah solusi audit yang valid.",
          wrongFeedback: "Salah, itu melanggar prinsip akuntansi dan bisa berakibat fatal."
        },
        {
          type: "written",
          title: `Memo ${topic}`,
          scenario: `Atasan meminta laporan perkembangan ${topic}.`,
          question: "Tulis memo singkat tentang temuan selisih atau dokumen yang hilang.",
          minLength: 15,
          keywords: ["laporan", "selisih", "dokumen", "menunggu", "konfirmasi", "tanggal"],
          correctFeedback: "Bagus, memomu informatif.",
          improvementTip: "Pastikan mencantumkan detail nominal atau tanggal spesifik.",
          exampleAnswer: "Berdasarkan pengecekan, terdapat dokumen hilang pada tanggal 12 dan sedang menunggu konfirmasi vendor."
        }
      ];
    } else {
      let formulaKeyword = "=SUM";
      if (index === 13) formulaKeyword = "=AVERAGE";
      if (index === 14) formulaKeyword = "=VLOOKUP";
      if (index === 15) formulaKeyword = "=SUMIF";
      if (index === 16) formulaKeyword = "=COUNTIF";
      if (index === 17) formulaKeyword = "=IF";
      if (index === 18) formulaKeyword = "=INDEX";
      if (index === 19) formulaKeyword = "=IFS";
      if (index === 20) formulaKeyword = "=IF(";

      const isVlookup = topic.includes("VLOOKUP");
      const isIf = topic.includes("IF");
      
      let scenarioTable = `Berikut data catatan keuangan:
| Row | A (No) | B (Item/Vendor) | C (Nominal) | D (Status) |
|---|---|---|---|---|
| 1 | 001 | PT Alpha | 5000000 | Lunas |
| 2 | 002 | PT Beta  | 12000000 | Hutang |
| 3 | 003 | PT Gamma | 8000000 | Lunas |
`;

      let q = `Gunakan rumus Excel yang tepat untuk menyelesaikan: ${topic}.`;
      if (isVlookup) q = "Ketikkan rumus VLOOKUP untuk mencari nominal PT Beta berdasarkan kolom Item (A2).";
      if (isIf) q = "Ketikkan rumus IF untuk mengecek apakah C2 lebih besar dari 10 juta (Jika ya 'High', jika tidak 'Low').";
      if (formulaKeyword === "=SUM") q = "Ketikkan rumus SUM untuk menjumlahkan semua nominal di kolom C.";
      if (formulaKeyword === "=SUMIF") q = "Ketikkan rumus SUMIF untuk menjumlahkan nominal di kolom C khusus yang berstatus Lunas (kolom D).";

      challenges = [
        {
          type: "multiple-choice",
          title: `Konsep Excel: ${topic}`,
          scenario: `Skenario simulasi formula untuk: ${topic}. Seringkali terjadi error pada cell.`,
          question: "Bagaimana cara terbaik memverifikasi rumusmu?",
          options: ["Cek manual dengan kalkulator", "Gunakan Evaluate Formula", "Biarkan saja", "Hapus rumus"],
          correctAnswer: 1,
          correctFeedback: "Tepat, Evaluate Formula sangat berguna di Excel.",
          wrongFeedback: "Salah, manfaatkan fitur bawaan Excel."
        },
        {
          type: "multiple-choice",
          title: `Error Handling ${topic}`,
          scenario: `Saat menerapkan ${topic}, Excel memunculkan error #VALUE!.`,
          question: "Apa penyebab utama error #VALUE!?",
          options: ["Kolom teks dikalkulasi", "Data referensi hilang", "Pembagian dengan nol", "Rumus belum disave"],
          correctAnswer: 0,
          correctFeedback: "Tepat, #VALUE! terjadi jika teks dihitung sebagai angka.",
          wrongFeedback: "Salah, silakan cek lagi arti error Excel."
        },
        {
          type: "written",
          title: `Tugas Rumus: ${topic}`,
          scenario: `${scenarioTable}\nSelesaikan tantangan berikut ini.`,
          question: q,
          minLength: 4,
          keywords: [formulaKeyword, formulaKeyword.toLowerCase(), formulaKeyword.replace("=", "")],
          correctFeedback: "Rumusmu sudah dicatat dengan benar.",
          improvementTip: "Pastikan struktur argumen rumus sesuai urutan yang diminta Excel.",
          exampleAnswer: `${formulaKeyword}(...)`
        }
      ];
    }
    return challenges;
  }
);

// Marketing
createDivisionFile(
  "marketing", "Marketing", "Analisis Pasar",
  "Pelajari riset tren pasar, menyusun pesan brand, dan merencanakan kampanye promosi yang efektif.",
  "MEJA MARKETING", "#fca5a5",
  [
    "Sebagai marketer, tugasmu adalah menyampaikan nilai brand kita ke audiens yang tepat.",
    "Tidak sekadar membuat konten menarik, tapi juga mengukur efektivitasnya.",
    "Fokuslah pada kebutuhan target pasar saat kamu mengambil keputusan."
  ],
  marketingTopics,
  (index, topic) => [
    {
      type: "multiple-choice",
      title: `Riset ${topic}`,
      scenario: `Kamu difokuskan pada ${topic}. Target audiens mulai jenuh.`,
      question: "Apa yang harus dilakukan untuk menaikkan engagement?",
      options: ["Ubah pesan (A/B testing)", "Hentikan promosi", "Ulangi konten lama", "Abaikan audiens"],
      correctAnswer: 0,
      correctFeedback: "Tepat, A/B Testing selalu menjadi kunci.",
      wrongFeedback: "Salah, harus lebih proaktif."
    },
    {
      type: "multiple-choice",
      title: `Keputusan ${topic}`,
      scenario: `Saat menjalankan ${topic}, dana promosi menipis.`,
      question: "Di mana sebaiknya anggaran tersisa difokuskan?",
      options: ["Pada channel dengan CTR tertinggi", "Bagi rata", "Cetak brosur", "Tidak digunakan"],
      correctAnswer: 0,
      correctFeedback: "Tepat, maksimalkan platform yang terbukti efektif.",
      wrongFeedback: "Salah, bagi rata bukan strategi optimal saat budget tipis."
    },
    {
      type: "written",
      title: `Strategi ${topic}`,
      scenario: `Buat rancangan singkat mengenai ${topic}.`,
      question: "Tulis 1 kalimat objektif utama untuk kampanye ini.",
      minLength: 15,
      keywords: ["meningkatkan", "target", "audiens", "engagement", "konversi", "brand"],
      correctFeedback: "Objektifmu sangat jelas.",
      improvementTip: "Gunakan metode SMART (Specific, Measurable, Achievable, Relevant, Time-bound).",
      exampleAnswer: "Tujuan utama adalah meningkatkan engagement target audiens hingga 20% bulan ini."
    }
  ]
);

// HR
createDivisionFile(
  "hr", "Human Resources", "Problem Solving",
  "Kelola siklus hidup karyawan, dari rekrutmen hingga penyelesaian konflik.",
  "MEJA HR", "#d8b4fe",
  [
    "Di HR, kamu adalah jembatan antara kebutuhan perusahaan dan kesejahteraan karyawan.",
    "Setiap keputusanmu akan berdampak langsung pada motivasi dan budaya kerja.",
    "Gunakan empati dan logika objektivitas dalam menyelesaikan studi kasus."
  ],
  hrTopics,
  (index, topic) => [
    {
      type: "multiple-choice",
      title: `Studi Kasus: ${topic}`,
      scenario: `Dalam agenda ${topic}, ada perbedaan ekspektasi antara manajemen dan karyawan.`,
      question: "Bagaimana cara menyeimbangkan keduanya?",
      options: ["Cari jalan tengah (regulasi)", "Ikuti kemauan karyawan", "Paksakan aturan manajemen", "Biarkan manajer pusing"],
      correctAnswer: 0,
      correctFeedback: "Tepat, regulasi (SOP & UU) adalah acuan utama HR.",
      wrongFeedback: "Salah, HR harus netral dan mengacu pada regulasi."
    },
    {
      type: "multiple-choice",
      title: `Prosedur ${topic}`,
      scenario: `Karyawan menuntut transparansi mengenai ${topic}.`,
      question: "Apa respon terbaik?",
      options: ["Sosialisasi terbuka", "Abaikan email mereka", "Beri Surat Peringatan", "Berikan informasi palsu"],
      correctAnswer: 0,
      correctFeedback: "Tepat, sosialisasi mencegah rumor negatif.",
      wrongFeedback: "Salah, transparansi penting untuk kepercayaan."
    },
    {
      type: "written",
      title: `Draft Komunikasi ${topic}`,
      scenario: `Perusahaan perlu menyebarkan info tentang ${topic}.`,
      question: "Buat kalimat pembuka email resmi terkait hal ini.",
      minLength: 15,
      keywords: ["karyawan", "perusahaan", "kebijakan", "selamat", "informasi", "pemberitahuan"],
      correctFeedback: "Pembuka yang sangat profesional.",
      improvementTip: "Pertahankan nada positif dan hormat.",
      exampleAnswer: "Selamat pagi rekan-rekan, berikut kami sampaikan informasi terbaru terkait kebijakan..."
    }
  ]
);
