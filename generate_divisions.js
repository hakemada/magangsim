const fs = require("fs");
const path = require("path");

function createDivisionFile(divisionId, name, skillName, description, deskLabel, color, mayaBriefing, sessionGenerator) {
  const sessions = [];
  for (let i = 0; i < 21; i++) {
    sessions.push(sessionGenerator(i));
  }

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
  (index) => {
    const day = Math.floor(index / 3) + 1;
    let difficulty = "Dasar";
    if (day >= 2 && day <= 4) difficulty = "Menengah";
    if (day == 5) difficulty = "Cukup Mudah (Excel)";
    if (day == 6) difficulty = "Cukup Sulit (Excel)";
    if (day == 7) difficulty = "Sulit (Excel)";

    let challenges = [];
    if (day < 5) {
      challenges = [
        {
          type: "multiple-choice",
          title: `Cek Transaksi ${index + 1}`,
          scenario: "Terdapat perbedaan pada nominal invoice dan bukti transfer.",
          question: "Apa tindakan pertama yang tepat?",
          options: ["Tolak langsung", "Konfirmasi ke pihak terkait", "Abaikan dan lanjutkan", "Ubah angka sepihak"],
          correctAnswer: 1,
          correctFeedback: "Benar, konfirmasi adalah langkah yang aman.",
          wrongFeedback: "Salah, sebaiknya jangan mengambil tindakan sepihak tanpa konfirmasi."
        },
        {
          type: "multiple-choice",
          title: `Hitung Saldo ${index + 1}`,
          scenario: "Saldo kas perusahaan adalah Rp 10 juta, hari ini ada pemasukan Rp 2 juta.",
          question: "Berapa saldo akhirnya?",
          options: ["Rp 8 juta", "Rp 12 juta", "Rp 10 juta", "Rp 20 juta"],
          correctAnswer: 1,
          correctFeedback: "Benar, saldo ditambahkan dengan pemasukan.",
          wrongFeedback: "Salah, periksa kembali perhitunganmu."
        },
        {
          type: "written",
          title: `Laporan Singkat ${index + 1}`,
          scenario: "Kamu perlu membuat laporan transaksi mencurigakan.",
          question: "Tulis poin penting laporan tersebut.",
          minLength: 15,
          keywords: ["transaksi", "bukti", "laporan", "tanggal", "nominal", "beda"],
          correctFeedback: "Bagus, laporan sudah cukup jelas.",
          improvementTip: "Pastikan selalu menyertakan tanggal dan nominal.",
          exampleAnswer: "Ditemukan transaksi beda nominal pada tanggal sekian."
        }
      ];
    } else {
      let formulaKeyword = "=SUM";
      let q = "Gunakan rumus penjumlahan dasar.";
      if (day === 6) { formulaKeyword = "=SUMIF"; q = "Gunakan rumus untuk menjumlah dengan kriteria."; }
      if (day === 7) { formulaKeyword = "=VLOOKUP"; q = "Gunakan rumus untuk mencari data dari tabel referensi."; }
      
      challenges = [
        {
          type: "multiple-choice",
          title: `Excel Kasus ${index + 1}A`,
          scenario: `Kamu sedang membuka laporan di Excel untuk analisis. (${difficulty})`,
          question: "Kapan rumus ini tepat digunakan?",
          options: ["Saat mencari nilai rata-rata", "Sesuai dengan panduan data harian", "Saat memformat warna", "Hanya jika ditanya atasan"],
          correctAnswer: 1,
          correctFeedback: "Tepat sekali.",
          wrongFeedback: "Kurang tepat, pahami fungsi dasar Excel."
        },
        {
          type: "multiple-choice",
          title: `Excel Kasus ${index + 1}B`,
          scenario: "Ada error #N/A pada sel rumusmu.",
          question: "Apa arti umum dari error ini?",
          options: ["Data referensi tidak ditemukan", "Format angka salah", "Rumus kurang tanda kurung", "File korup"],
          correctAnswer: 0,
          correctFeedback: "Tepat, #N/A biasanya berarti data pencarian tidak ada.",
          wrongFeedback: "Salah, #N/A merujuk pada nilai yang 'Not Available'."
        },
        {
          type: "written",
          title: `Penyusunan Rumus ${index + 1}`,
          scenario: "Lengkapi rumus untuk menyelesaikan tugas di skenario ini.",
          question: q,
          minLength: 4,
          keywords: [formulaKeyword, formulaKeyword.toLowerCase(), formulaKeyword.replace("=", "")],
          correctFeedback: "Rumus tepat sasaran.",
          improvementTip: "Pastikan menyertakan tanda = sebelum rumus di Excel.",
          exampleAnswer: `Gunakan rumus ${formulaKeyword}(...)`
        }
      ];
    }

    return {
      title: `Hari ${day} - Sesi ${index % 3 + 1}`,
      difficulty: difficulty,
      challenges
    };
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
  (index) => {
    const day = Math.floor(index / 3) + 1;
    let difficulty = "Dasar";
    if (day >= 2 && day <= 4) difficulty = "Menengah";
    if (day == 5) difficulty = "Menengah-Atas";
    if (day == 6) difficulty = "Sulit";
    if (day == 7) difficulty = "Sangat Sulit";

    return {
      title: `Hari ${day} - Sesi ${index % 3 + 1}`,
      difficulty,
      challenges: [
        {
          type: "multiple-choice",
          title: `Riset Pasar ${index + 1}`,
          scenario: "Audiens target adalah kalangan Gen Z.",
          question: "Platform mana yang paling sesuai untuk campaign video pendek?",
          options: ["LinkedIn", "TikTok", "Koran Lokal", "Email Newsletter"],
          correctAnswer: 1,
          correctFeedback: "Tepat, TikTok memiliki penetrasi tinggi di Gen Z.",
          wrongFeedback: "Salah, platform tersebut kurang optimal untuk audiens ini."
        },
        {
          type: "multiple-choice",
          title: `Analisis Iklan ${index + 1}`,
          scenario: "Click-through rate (CTR) iklan kita menurun minggu ini.",
          question: "Apa tindakan pertama yang disarankan?",
          options: ["Menambah budget iklan 2x lipat", "Mengevaluasi visual dan teks copywriting", "Menghapus akun media sosial", "Membiarkan saja"],
          correctAnswer: 1,
          correctFeedback: "Evaluasi kreatif adalah langkah awal terbaik saat CTR turun.",
          wrongFeedback: "Salah, tindakan tersebut berisiko membuang anggaran."
        },
        {
          type: "written",
          title: `Copywriting Campaign ${index + 1}`,
          scenario: "Buat kalimat ajakan (Call-to-Action) untuk promo akhir tahun.",
          question: "Tuliskan CTA yang menarik urgensi.",
          minLength: 15,
          keywords: ["promo", "sekarang", "diskon", "terbatas", "beli", "jangan", "lewatkan"],
          correctFeedback: "Bagus, CTA sangat kuat dan persuasif.",
          improvementTip: "Coba gunakan kata-kata yang mendesak seperti 'terbatas' atau 'sekarang'.",
          exampleAnswer: "Dapatkan diskon terbatas ini, beli sekarang sebelum kehabisan!"
        }
      ]
    };
  }
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
  (index) => {
    const day = Math.floor(index / 3) + 1;
    let difficulty = "Dasar";
    if (day >= 2 && day <= 4) difficulty = "Menengah";
    if (day == 5) difficulty = "Menengah-Atas";
    if (day == 6) difficulty = "Sulit";
    if (day == 7) difficulty = "Sangat Sulit";

    return {
      title: `Hari ${day} - Sesi ${index % 3 + 1}`,
      difficulty,
      challenges: [
        {
          type: "multiple-choice",
          title: `Seleksi CV ${index + 1}`,
          scenario: "Seorang kandidat tidak memenuhi satu kualifikasi opsional tetapi memiliki pengalaman luar biasa.",
          question: "Apa yang sebaiknya dilakukan?",
          options: ["Tolak lamaran", "Lanjutkan ke wawancara", "Blokir emailnya", "Tawarkan posisi lebih rendah secara otomatis"],
          correctAnswer: 1,
          correctFeedback: "Benar, pengalaman luar biasa bisa menutupi kualifikasi opsional.",
          wrongFeedback: "Salah, kamu bisa kehilangan talenta bagus."
        },
        {
          type: "multiple-choice",
          title: `Penanganan Konflik ${index + 1}`,
          scenario: "Dua anggota tim berselisih paham mengenai pembagian tugas.",
          question: "Sebagai HR, apa pendekatan terbaik?",
          options: ["Memecat keduanya", "Memihak pada anggota senior", "Memfasilitasi mediasi bersama", "Mengabaikan agar selesai sendiri"],
          correctAnswer: 2,
          correctFeedback: "Tepat, mediasi netral membantu resolusi masalah.",
          wrongFeedback: "Salah, HR harus bersikap objektif dan solutif."
        },
        {
          type: "written",
          title: `SOP Komunikasi ${index + 1}`,
          scenario: "Ada perubahan kebijakan cuti mendadak.",
          question: "Tuliskan pengumuman singkat yang empati kepada karyawan.",
          minLength: 15,
          keywords: ["cuti", "kebijakan", "maaf", "mohon", "pengertian", "perubahan", "info"],
          correctFeedback: "Pengumuman disusun dengan baik dan empatik.",
          improvementTip: "Pastikan mencantumkan alasan positif dan kata-kata apresiasi.",
          exampleAnswer: "Mohon perhatiannya terkait perubahan kebijakan cuti. Kami harap pengertian dari rekan-rekan demi kelancaran bersama."
        }
      ]
    };
  }
);
