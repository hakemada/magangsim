import { Division } from "../types";

export const marketingDivision: Division = {
  id: "marketing",
  name: "Marketing",
  skillName: "Analisis Pasar",
  description: "Pelajari riset tren pasar, menyusun pesan brand, dan merencanakan kampanye promosi yang efektif.",
  deskLabel: "MEJA MARKETING",
  color: "#fca5a5",
  mayaBriefing: [
    "Sebagai marketer, tugasmu adalah menyampaikan nilai brand kita ke audiens yang tepat.",
    "Tidak sekadar membuat konten menarik, tapi juga mengukur efektivitasnya.",
    "Fokuslah pada kebutuhan target pasar saat kamu mengambil keputusan."
],
  sessions: [
    {
        "title": "Hari 1 - Sesi 1: Riset Audiens",
        "difficulty": "Dasar",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Menentukan Persona",
                "scenario": "Perusahaan meluncurkan minuman isotonik.",
                "question": "Siapa target audiens yang paling tepat?",
                "options": [
                    "Atlet dan pekerja aktif",
                    "Lansia di panti jompo",
                    "Anak balita",
                    "Orang dengan mobilitas rendah"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Tepat! Atlet adalah konsumen utama isotonik.",
                "wrongFeedback": "Kurang tepat, pikirkan siapa yang paling butuh hidrasi cepat."
            },
            {
                "type": "multiple-choice",
                "title": "Metode Riset",
                "scenario": "Tim bingung memilih cara mendapatkan feedback produk.",
                "question": "Metode mana yang paling hemat biaya untuk riset awal?",
                "options": [
                    "Survei online",
                    "Menyewa agensi riset",
                    "Iklan TV",
                    "Membangun lab khusus"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, survei online murah dan efektif.",
                "wrongFeedback": "Salah, opsi tersebut memakan biaya besar."
            },
            {
                "type": "written",
                "title": "Mendefinisikan Demografi",
                "scenario": "Anda diminta menyusun profil demografi untuk produk skincare remaja.",
                "question": "Sebutkan dua variabel demografi penting dan alasannya.",
                "minLength": 5,
                "keywords": [
                    "usia",
                    "gender"
                ],
                "correctFeedback": "Bagus, usia dan gender sangat krusial untuk skincare.",
                "improvementTip": "Pastikan selalu mengaitkan variabel dengan daya beli.",
                "exampleAnswer": "Variabel utama adalah usia dan gender karena skincare remaja menargetkan kelompok umur spesifik."
            }
        ]
    },
    {
        "title": "Hari 1 - Sesi 2: Segmentasi Pasar",
        "difficulty": "Dasar",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Segmentasi Geografis",
                "scenario": "Produk jaket tebal musim dingin siap dipasarkan.",
                "question": "Wilayah mana yang paling potensial?",
                "options": [
                    "Eropa Utara",
                    "Gurun Sahara",
                    "Asia Tenggara",
                    "Karibia"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Tepat, Eropa Utara memiliki musim dingin ekstrem.",
                "wrongFeedback": "Salah, daerah tropis/gurun tidak butuh jaket tebal."
            },
            {
                "type": "multiple-choice",
                "title": "Segmentasi Psikografis",
                "scenario": "Produk jam tangan mewah vegan.",
                "question": "Gaya hidup apa yang disasar?",
                "options": [
                    "Eksklusif dan peduli lingkungan",
                    "Murah dan massal",
                    "Tradisional dan anti-teknologi",
                    "Konsumtif tanpa pandang bulu"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, eksklusif namun ramah lingkungan.",
                "wrongFeedback": "Salah, ini produk niche yang spesifik."
            },
            {
                "type": "written",
                "title": "Manfaat Segmentasi",
                "scenario": "Atasan bertanya mengapa kita tidak menjual ke 'semua orang'.",
                "question": "Jelaskan mengapa segmentasi lebih baik daripada pemasaran massal.",
                "minLength": 5,
                "keywords": [
                    "fokus",
                    "efisien"
                ],
                "correctFeedback": "Tepat, efisiensi budget adalah kunci.",
                "improvementTip": "Sebutkan juga tentang relevansi pesan iklan.",
                "exampleAnswer": "Segmentasi membantu kita lebih fokus dan efisien dalam menggunakan budget iklan."
            }
        ]
    },
    {
        "title": "Hari 1 - Sesi 3: Analisis Kompetitor",
        "difficulty": "Dasar",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Mengidentifikasi Pesaing",
                "scenario": "Anda membuka kedai kopi lokal.",
                "question": "Siapa pesaing langsung Anda?",
                "options": [
                    "Kedai kopi di seberang jalan",
                    "Pabrik teh celup",
                    "Toko buku",
                    "Restoran fine dining"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, mereka menawarkan produk dan lokasi serupa.",
                "wrongFeedback": "Salah, fokus pada bisnis yang menawarkan produk sejenis."
            },
            {
                "type": "multiple-choice",
                "title": "Analisis SWOT",
                "scenario": "Pesaing memiliki harga lebih murah, namun kualitas Anda lebih baik.",
                "question": "Dalam SWOT, kualitas unggul Anda disebut sebagai?",
                "options": [
                    "Strength (Kekuatan)",
                    "Weakness (Kelemahan)",
                    "Opportunity (Peluang)",
                    "Threat (Ancaman)"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, kualitas adalah kekuatan internal.",
                "wrongFeedback": "Salah, kualitas produk sendiri adalah faktor internal positif (Strength)."
            },
            {
                "type": "written",
                "title": "Strategi Diferensiasi",
                "scenario": "Kompetitor menurunkan harga gila-gilaan.",
                "question": "Bagaimana cara kita bertahan tanpa ikut perang harga?",
                "minLength": 5,
                "keywords": [
                    "pelayanan",
                    "kualitas",
                    "unik"
                ],
                "correctFeedback": "Bagus, diferensiasi non-harga sangat penting.",
                "improvementTip": "Fokus pada nilai tambah yang tidak dimiliki pesaing.",
                "exampleAnswer": "Kita bisa meningkatkan kualitas pelayanan atau menawarkan bundling unik."
            }
        ]
    },
    {
        "title": "Hari 2 - Sesi 1: Social Media Organic",
        "difficulty": "Dasar",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Pemilihan Platform",
                "scenario": "Target audiens Anda adalah profesional b2b.",
                "question": "Platform mana yang paling cocok?",
                "options": [
                    "LinkedIn",
                    "TikTok",
                    "Snapchat",
                    "Pinterest"
                ],
                "correctAnswer": 0,
                "correctFeedback": "LinkedIn adalah platform terbaik untuk B2B.",
                "wrongFeedback": "Platform lain lebih condong ke B2C dan hiburan."
            },
            {
                "type": "multiple-choice",
                "title": "Waktu Posting",
                "scenario": "Engagement turun drastis seminggu terakhir.",
                "question": "Apa hal pertama yang sebaiknya dicek pada organik sosmed?",
                "options": [
                    "Insight waktu aktif followers",
                    "Warna logo perusahaan",
                    "Alamat kantor",
                    "Bentuk font caption"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, memposting di jam aktif sangat penting.",
                "wrongFeedback": "Salah, elemen desain kecil jarang menyebabkan drop drastis dibanding timing."
            },
            {
                "type": "written",
                "title": "Meningkatkan Engagement",
                "scenario": "Akun Instagram brand Anda punya banyak follower tapi sepi komentar.",
                "question": "Apa ide konten untuk memancing interaksi?",
                "minLength": 5,
                "keywords": [
                    "tanya",
                    "kuis",
                    "giveaway"
                ],
                "correctFeedback": "Tepat, format interaktif meningkatkan komentar.",
                "improvementTip": "Coba gunakan fitur polling atau Q&A di Stories.",
                "exampleAnswer": "Saya akan membuat konten kuis atau memancing diskusi dengan pertanyaan."
            }
        ]
    },
    {
        "title": "Hari 2 - Sesi 2: Social Media Paid",
        "difficulty": "Menengah",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Tujuan Iklan (Objective)",
                "scenario": "Anda ingin orang mengunduh aplikasi baru.",
                "question": "Objective iklan apa yang dipilih?",
                "options": [
                    "App Installs",
                    "Brand Awareness",
                    "Page Likes",
                    "Store Traffic"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Tepat, App Installs dioptimasi untuk unduhan.",
                "wrongFeedback": "Salah, pilih objektif yang sesuai target akhir."
            },
            {
                "type": "multiple-choice",
                "title": "Custom Audience",
                "scenario": "Anda memiliki database email pelanggan lama.",
                "question": "Fitur apa yang digunakan untuk menargetkan mereka di Facebook?",
                "options": [
                    "Custom Audience",
                    "Lookalike Audience",
                    "Core Audience",
                    "Saved Audience"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, Custom Audience untuk data yang sudah ada.",
                "wrongFeedback": "Salah, Lookalike untuk mencari audiens baru yang mirip."
            },
            {
                "type": "written",
                "title": "Evaluasi Iklan",
                "scenario": "Iklan berjalan 3 hari namun tidak ada konversi, padahal klik tinggi.",
                "question": "Apa yang mungkin menjadi masalah?",
                "minLength": 5,
                "keywords": [
                    "landing page",
                    "harga"
                ],
                "correctFeedback": "Analisis yang baik, masalah ada di post-click.",
                "improvementTip": "Cek kecepatan web dan kesesuaian janji iklan.",
                "exampleAnswer": "Masalahnya mungkin ada pada landing page yang jelek atau harga kemahalan."
            }
        ]
    },
    {
        "title": "Hari 2 - Sesi 3: Influencer Marketing",
        "difficulty": "Menengah",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Memilih Influencer",
                "scenario": "Budget terbatas, target niche spesifik (penggemar mekanik).",
                "question": "Tipe influencer mana yang paling pas?",
                "options": [
                    "Micro-influencer mekanik",
                    "Mega artis pop",
                    "Selebgram fashion",
                    "Akun meme umum"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, micro-influencer niche lebih murah dan tertarget.",
                "wrongFeedback": "Salah, artis pop terlalu mahal dan tidak tertarget."
            },
            {
                "type": "multiple-choice",
                "title": "Metrik Keberhasilan",
                "scenario": "Influencer baru saja selesai memposting review.",
                "question": "Metrik apa yang menunjukkan ketertarikan nyata audiens?",
                "options": [
                    "Saves dan Shares",
                    "Jumlah Follower influencer",
                    "Warna baju influencer",
                    "Jam posting"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, Saves dan Shares menunjukkan intensi tinggi.",
                "wrongFeedback": "Follower besar tidak menjamin engagement tinggi."
            },
            {
                "type": "written",
                "title": "Briefing Influencer",
                "scenario": "Influencer membuat konten yang melenceng dari pesan brand.",
                "question": "Apa yang seharusnya disiapkan sebelum kerja sama?",
                "minLength": 5,
                "keywords": [
                    "brief",
                    "guideline",
                    "kontrak"
                ],
                "correctFeedback": "Tepat, creative brief yang jelas sangat penting.",
                "improvementTip": "Sertakan juga do's and don'ts.",
                "exampleAnswer": "Kita harus memberikan brief dan guideline yang jelas di awal."
            }
        ]
    },
    {
        "title": "Hari 3 - Sesi 1: Content Strategy",
        "difficulty": "Menengah",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Pilar Konten",
                "scenario": "Brand fashion ingin variasi konten agar tidak jualan terus.",
                "question": "Jenis konten edukasi apa yang cocok?",
                "options": [
                    "Tips mix & match baju",
                    "Katalog diskon 50%",
                    "Foto gudang",
                    "Laporan keuangan"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, tips styling adalah edukasi bernilai bagi followers.",
                "wrongFeedback": "Salah, katalog diskon itu promosi, bukan edukasi."
            },
            {
                "type": "multiple-choice",
                "title": "Repurposing Konten",
                "scenario": "Anda memiliki video YouTube berdurasi 1 jam.",
                "question": "Bagaimana cara me-repurpose untuk TikTok?",
                "options": [
                    "Dipotong jadi klip 30 detik menarik",
                    "Upload full 1 jam",
                    "Diubah jadi artikel",
                    "Dihapus saja"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Tepat, short-form video cocok untuk TikTok.",
                "wrongFeedback": "TikTok lebih optimal untuk video pendek."
            },
            {
                "type": "written",
                "title": "Content Calendar",
                "scenario": "Tim selalu telat memposting konten tematik hari raya.",
                "question": "Solusi apa yang bisa diterapkan?",
                "minLength": 5,
                "keywords": [
                    "kalender",
                    "jadwal",
                    "planning"
                ],
                "correctFeedback": "Benar, content calendar menyelesaikan masalah timing.",
                "improvementTip": "Gunakan tools scheduling otomatis.",
                "exampleAnswer": "Membuat kalender konten sebulan sebelumnya agar jadwal teratur."
            }
        ]
    },
    {
        "title": "Hari 3 - Sesi 2: SEO On-Page",
        "difficulty": "Menengah",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Optimasi Judul",
                "scenario": "Artikel tentang 'Cara Membuat Kue' sepi pengunjung.",
                "question": "Tag HTML apa yang paling krusial disisipi keyword?",
                "options": [
                    "Title Tag (<title>)",
                    "Footer",
                    "Komentar",
                    "Sidebar"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Title tag adalah faktor SEO on-page utama.",
                "wrongFeedback": "Elemen lain kurang berdampak besar."
            },
            {
                "type": "multiple-choice",
                "title": "Image SEO",
                "scenario": "Banyak gambar di website berukuran besar dengan nama 'IMG_123.jpg'.",
                "question": "Apa yang harus dilakukan untuk SEO?",
                "options": [
                    "Kompres size dan isi Alt Text",
                    "Hapus semua gambar",
                    "Ubah jadi format PDF",
                    "Biarkan saja asal HD"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Kompresi mempercepat loading, Alt text dibaca Google.",
                "wrongFeedback": "Mengabaikan gambar akan merusak SEO."
            },
            {
                "type": "written",
                "title": "Keyword Intent",
                "scenario": "Orang mencari 'Harga Laptop Gaming'.",
                "question": "Apa jenis intent pencarian ini?",
                "minLength": 5,
                "keywords": [
                    "transaksional",
                    "beli",
                    "komersial"
                ],
                "correctFeedback": "Tepat, ini adalah intent transaksional/komersial.",
                "improvementTip": "Buat konten yang langsung menampilkan perbandingan harga.",
                "exampleAnswer": "Itu adalah pencarian komersial atau transaksional karena user ingin membeli."
            }
        ]
    },
    {
        "title": "Hari 3 - Sesi 3: SEO Off-Page",
        "difficulty": "Menengah",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Membangun Backlink",
                "scenario": "Domain Authority website Anda sangat rendah.",
                "question": "Strategi off-page apa yang paling efektif?",
                "options": [
                    "Mendapat backlink dari web kredibel",
                    "Mengganti warna background",
                    "Spam komentar di blog orang",
                    "Membeli trafik bot"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Backlink berkualitas menaikkan otoritas domain.",
                "wrongFeedback": "Spam dan bot justru merusak reputasi SEO (Blackhat)."
            },
            {
                "type": "multiple-choice",
                "title": "Anchor Text",
                "scenario": "Sebuah web berita menautkan link ke situs Anda.",
                "question": "Mana anchor text yang paling baik untuk SEO jasa desain?",
                "options": [
                    "'Jasa Desain Grafis Terbaik'",
                    "'Klik Disini'",
                    "'Website ini'",
                    "'Link'"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Anchor text deskriptif membantu Google memahami konteks.",
                "wrongFeedback": "'Klik disini' tidak memberi konteks kata kunci."
            },
            {
                "type": "written",
                "title": "Digital PR untuk SEO",
                "scenario": "Anda ingin mendapat liputan media nasional secara gratis.",
                "question": "Konten seperti apa yang biasanya diliput media?",
                "minLength": 5,
                "keywords": [
                    "data",
                    "riset",
                    "unik",
                    "tren"
                ],
                "correctFeedback": "Benar, media menyukai data dan insight baru.",
                "improvementTip": "Kemas dalam bentuk Press Release.",
                "exampleAnswer": "Konten berupa data riset atau survei unik yang sedang tren."
            }
        ]
    },
    {
        "title": "Hari 4 - Sesi 1: Email Marketing",
        "difficulty": "Menengah",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Open Rate",
                "scenario": "Banyak email terkirim, tapi jarang dibuka.",
                "question": "Elemen mana yang paling menentukan email dibuka atau tidak?",
                "options": [
                    "Subject Line",
                    "Footer",
                    "Warna Tombol",
                    "Ukuran Font Body"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Subject line adalah hal pertama yang dilihat penerima.",
                "wrongFeedback": "Isi email tidak akan terlihat jika tidak dibuka."
            },
            {
                "type": "multiple-choice",
                "title": "Call to Action (CTA)",
                "scenario": "Email banyak dibaca tapi tidak ada yang klik link produk.",
                "question": "Apa kesalahan umum pada desain email?",
                "options": [
                    "CTA tidak jelas atau tersembunyi",
                    "Logo terlalu kecil",
                    "Typo di paragraf terakhir",
                    "Tidak ada salam penutup"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, CTA harus menonjol dan jelas tujuannya.",
                "wrongFeedback": "Hal lain bersifat kosmetik dibanding CTA."
            },
            {
                "type": "written",
                "title": "Menghindari Spam",
                "scenario": "Email campaign masuk ke folder SPAM pengguna.",
                "question": "Sebutkan satu cara mencegah email ditandai spam.",
                "minLength": 5,
                "keywords": [
                    "izin",
                    "opt-in",
                    "judul",
                    "bersihkan"
                ],
                "correctFeedback": "Tepat, database yang bersih dan opt-in adalah kunci.",
                "improvementTip": "Hindari kata-kata spammy seperti 'GRATISSSS' di subject.",
                "exampleAnswer": "Gunakan sistem double opt-in dan hindari kata berlebihan di judul."
            }
        ]
    },
    {
        "title": "Hari 4 - Sesi 2: Automation & CRM",
        "difficulty": "Menengah-Atas",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Welcome Email",
                "scenario": "User baru saja mendaftar di website.",
                "question": "Kapan welcome email otomatis harus dikirim?",
                "options": [
                    "Seketika / dalam hitungan menit",
                    "Bulan depan",
                    "Menunggu admin manual",
                    "Saat user komplain"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Automation memungkinkan pengiriman instan saat user sedang hangat.",
                "wrongFeedback": "Menunda pengiriman mengurangi momentum ketertarikan user."
            },
            {
                "type": "multiple-choice",
                "title": "Lead Scoring",
                "scenario": "CRM memiliki ribuan leads dari berbagai sumber.",
                "question": "Fungsi utama lead scoring adalah?",
                "options": [
                    "Membedakan lead yang siap beli vs yang belum",
                    "Menghapus data",
                    "Mengganti nama pelanggan",
                    "Menaikkan harga produk"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, memprioritaskan lead berkualitas untuk tim sales.",
                "wrongFeedback": "CRM bukan sekadar alat penghapus atau pengubah harga."
            },
            {
                "type": "written",
                "title": "Abandoned Cart",
                "scenario": "Banyak pelanggan memasukkan barang ke keranjang tapi tidak bayar.",
                "question": "Strategi automasi apa yang bisa diterapkan?",
                "minLength": 5,
                "keywords": [
                    "email",
                    "diskon",
                    "ingatkan"
                ],
                "correctFeedback": "Tepat, abandoned cart email sangat efektif recovery sales.",
                "improvementTip": "Beri batas waktu pada diskon agar ada urgensi.",
                "exampleAnswer": "Kirim email otomatis mengingatkan keranjang mereka beserta diskon kecil."
            }
        ]
    },
    {
        "title": "Hari 4 - Sesi 3: Customer Retention",
        "difficulty": "Menengah-Atas",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Loyalty Program",
                "scenario": "Klinik kecantikan ingin pelanggan rutin datang tiap bulan.",
                "question": "Program apa yang paling relevan?",
                "options": [
                    "Sistem kumpulkan poin untuk treatment gratis",
                    "Flash sale setahun sekali",
                    "Pasang baliho di jalan",
                    "Ubah logo tiap bulan"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Sistem poin mendorong kunjungan berulang.",
                "wrongFeedback": "Flash sale tahunan tidak mendorong kunjungan bulanan."
            },
            {
                "type": "multiple-choice",
                "title": "Churn Rate",
                "scenario": "Banyak pengguna membatalkan langganan software (SaaS).",
                "question": "Apa arti dari metrik ini?",
                "options": [
                    "Churn rate tinggi, bisnis dalam bahaya",
                    "Churn rate tinggi itu bagus",
                    "Churn rate tidak penting",
                    "Tanda marketing sukses"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, churn rate tinggi berarti banyak pelanggan pergi.",
                "wrongFeedback": "Churn rate adalah metrik yang harus ditekan sekecil mungkin."
            },
            {
                "type": "written",
                "title": "Feedback Pelanggan",
                "scenario": "Rating aplikasi turun karena fitur baru yang membingungkan.",
                "question": "Tindakan retention apa yang harus segera dilakukan?",
                "minLength": 5,
                "keywords": [
                    "maaf",
                    "komunikasi",
                    "perbaiki",
                    "dengar"
                ],
                "correctFeedback": "Bagus, merespons feedback dengan cepat menahan user churn.",
                "improvementTip": "Kirim email penjelasan dan panduan ke seluruh user.",
                "exampleAnswer": "Mendengarkan keluhan mereka, minta maaf, dan buat panduan pemakaian."
            }
        ]
    },
    {
        "title": "Hari 5 - Sesi 1: Google Ads",
        "difficulty": "Menengah-Atas",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Keyword Match Types",
                "scenario": "Anda tidak ingin iklan muncul pada pencarian yang tidak relevan.",
                "question": "Tipe keyword apa yang sangat membatasi variasi pencarian?",
                "options": [
                    "Exact Match",
                    "Broad Match",
                    "Phrase Match",
                    "Negative Keyword"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Exact match membatasi tayangan hanya pada kata kunci presisi.",
                "wrongFeedback": "Broad match justru sangat luas."
            },
            {
                "type": "multiple-choice",
                "title": "Quality Score",
                "scenario": "Biaya per klik (CPC) iklan Anda sangat mahal.",
                "question": "Faktor apa yang bisa dinaikkan untuk menurunkan CPC Google Ads?",
                "options": [
                    "Quality Score iklan & landing page",
                    "Menaikkan budget harian",
                    "Memperbanyak jumlah keyword",
                    "Mengganti kartu kredit"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Quality score yang tinggi membuat CPC lebih murah.",
                "wrongFeedback": "Menaikkan budget tidak menurunkan harga satuan klik."
            },
            {
                "type": "written",
                "title": "Search Intent Ads",
                "scenario": "Klien ingin pasang iklan untuk kata 'Apa itu asuransi'.",
                "question": "Mengapa keyword ini kurang bagus untuk konversi penjualan langsung?",
                "minLength": 5,
                "keywords": [
                    "informasi",
                    "edukasi",
                    "belum siap"
                ],
                "correctFeedback": "Benar, intent-nya masih edukasional.",
                "improvementTip": "Sarankan keyword seperti 'Beli asuransi kesehatan'.",
                "exampleAnswer": "Karena itu adalah pencarian informasi, orangnya belum niat membeli."
            }
        ]
    },
    {
        "title": "Hari 5 - Sesi 2: Meta Ads & CTR",
        "difficulty": "Menengah-Atas",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Click-Through Rate (CTR)",
                "scenario": "Iklan tayang 10,000 kali, diklik 100 kali.",
                "question": "Berapa CTR iklan tersebut?",
                "options": [
                    "1%",
                    "10%",
                    "0.1%",
                    "100%"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Tepat, (100 / 10,000) x 100% = 1%.",
                "wrongFeedback": "Perhatikan cara menghitung: (Klik/Impresi) x 100%."
            },
            {
                "type": "multiple-choice",
                "title": "Ad Fatigue",
                "scenario": "Iklan yang sama jalan 3 bulan, performa menurun tajam.",
                "question": "Apa istilah fenomena ini di mana audiens bosan?",
                "options": [
                    "Ad Fatigue",
                    "Ad Blocker",
                    "Ad relevancy",
                    "Ad rank"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, Ad Fatigue terjadi saat audiens bosan melihat visual yang sama.",
                "wrongFeedback": "Ad blocker adalah software pemblokir."
            },
            {
                "type": "written",
                "title": "Meningkatkan CTR",
                "scenario": "CTR iklan gambar Anda di bawah standar industri.",
                "question": "Apa perubahan kreatif yang bisa dicoba?",
                "minLength": 5,
                "keywords": [
                    "warna",
                    "teks",
                    "gambar",
                    "video",
                    "copywriting"
                ],
                "correctFeedback": "Bagus, mengganti format atau headline sangat berpengaruh.",
                "improvementTip": "Gunakan wajah manusia atau video pendek.",
                "exampleAnswer": "Ubah gambar menjadi lebih menarik atau gunakan teks copywriting yang memancing klik."
            }
        ]
    },
    {
        "title": "Hari 5 - Sesi 3: A/B Testing",
        "difficulty": "Sulit",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Variabel Testing",
                "scenario": "Anda ingin melakukan A/B test pada email marketing.",
                "question": "Berapa banyak elemen yang sebaiknya diubah dalam satu kali tes?",
                "options": [
                    "Satu elemen saja",
                    "Semua elemen",
                    "Minimal tiga elemen",
                    "Hanya warna saja"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Benar, mengubah 1 elemen memastikan kita tahu penyebab perubahan metrik.",
                "wrongFeedback": "Jika mengubah semua, kita tak tahu mana yang berhasil."
            },
            {
                "type": "multiple-choice",
                "title": "Statistical Significance",
                "scenario": "Versi A menang dari Versi B, tapi baru diuji ke 10 orang.",
                "question": "Mengapa hasil ini belum valid?",
                "options": [
                    "Belum mencapai signifikansi statistik (sampel terlalu kecil)",
                    "Warna B lebih bagus",
                    "Waktu tes terlalu pagi",
                    "Email tidak dikirim ke CEO"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Tepat, sampel 10 orang terlalu kecil untuk mengambil kesimpulan.",
                "wrongFeedback": "Dalam data, ukuran sampel adalah segalanya."
            },
            {
                "type": "written",
                "title": "Menentukan Pemenang",
                "scenario": "Iklan A punya CTR tinggi tapi sales rendah. Iklan B CTR rendah tapi sales tinggi.",
                "question": "Mana yang Anda jadikan pemenang untuk kampanye penjualan?",
                "minLength": 5,
                "keywords": [
                    "sales",
                    "penjualan",
                    "b",
                    "tujuan"
                ],
                "correctFeedback": "Tepat, sesuaikan dengan tujuan akhir bisnis.",
                "improvementTip": "CTR tinggi tapi tanpa sales disebut clickbait.",
                "exampleAnswer": "Iklan B, karena tujuan utamanya adalah penjualan (sales), bukan sekadar klik."
            }
        ]
    },
    {
        "title": "Hari 6 - Sesi 1: PR Strategy",
        "difficulty": "Sulit",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Media Relations",
                "scenario": "Perusahaan merilis teknologi daur ulang inovatif.",
                "question": "Kepada siapa press release sebaiknya dikirim?",
                "options": [
                    "Jurnalis rubrik lingkungan/tekno",
                    "Semua wartawan hiburan",
                    "Influencer kuliner",
                    "Pesaing bisnis"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Pitching harus relevan dengan rubrik jurnalis.",
                "wrongFeedback": "Mengirim ke jurnalis yang salah tidak akan diliput."
            },
            {
                "type": "multiple-choice",
                "title": "Press Conference",
                "scenario": "Acara jumpa pers sepi wartawan padahal undangan sudah disebar.",
                "question": "Apa kesalahan umum eksekusi jumpa pers?",
                "options": [
                    "Waktu berbenturan dengan berita besar lain (bad timing)",
                    "Snack kurang mahal",
                    "Ruangan terlalu terang",
                    "MC kurang lucu"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Timing sangat kritis dalam PR.",
                "wrongFeedback": "Wartawan datang untuk berita, bukan snack."
            },
            {
                "type": "written",
                "title": "Pitching Angle",
                "scenario": "Perusahaan Anda ulang tahun ke-10. Jurnalis bilang itu tidak bernilai berita.",
                "question": "Bagaimana mengubah angle agar menarik diliput?",
                "minLength": 5,
                "keywords": [
                    "dampak",
                    "CSR",
                    "masyarakat",
                    "inovasi"
                ],
                "correctFeedback": "Bagus, media butuh berita yang berdampak pada masyarakat.",
                "improvementTip": "Kaitkan dengan data kontribusi ekonomi atau CSR.",
                "exampleAnswer": "Fokus pada dampak sosial CSR perusahaan selama 10 tahun terakhir."
            }
        ]
    },
    {
        "title": "Hari 6 - Sesi 2: Brand Identity",
        "difficulty": "Sulit",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Brand Voice",
                "scenario": "Bank digital membidik Gen Z.",
                "question": "Tone of voice mana yang paling tepat?",
                "options": [
                    "Kasual, edukatif, bersahabat",
                    "Sangat kaku dan birokratis",
                    "Penuh dengan jargon teknis keuangan",
                    "Marah dan agresif"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Gen Z menyukai brand yang autentik dan mudah dipahami.",
                "wrongFeedback": "Bahasa kaku akan menjauhkan Gen Z."
            },
            {
                "type": "multiple-choice",
                "title": "Rebranding",
                "scenario": "Perusahaan taksi tradisional ingin terlihat modern seperti ride-hailing.",
                "question": "Langkah apa yang paling mendasar selain ganti logo?",
                "options": [
                    "Memperbaiki core experience (aplikasi & layanan)",
                    "Beli armada warna emas",
                    "Ganti seragam supir saja",
                    "Naikkan tarif 3x lipat"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Rebranding gagal jika produk intinya tidak ikut diperbaiki.",
                "wrongFeedback": "Kosmetik luar tidak cukup untuk bersaing."
            },
            {
                "type": "written",
                "title": "Brand Guidelines",
                "scenario": "Setiap cabang membuat desain promosi dengan font dan warna berbeda-beda.",
                "question": "Dokumen apa yang tidak dipatuhi atau belum dimiliki perusahaan?",
                "minLength": 5,
                "keywords": [
                    "brand",
                    "guideline",
                    "book",
                    "manual"
                ],
                "correctFeedback": "Benar, Brand Guideline menjaga konsistensi visual.",
                "improvementTip": "Pastikan semua tim desain memilikinya.",
                "exampleAnswer": "Mereka tidak mematuhi Brand Guidelines atau buku panduan desain perusahaan."
            }
        ]
    },
    {
        "title": "Hari 6 - Sesi 3: Crisis Management",
        "difficulty": "Sangat Sulit",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Golden Hour",
                "scenario": "Viral video pelanggan menemukan benda asing di makanan Anda.",
                "question": "Kapan waktu terbaik mengeluarkan pernyataan resmi awal?",
                "options": [
                    "Secepatnya (dalam 1-2 jam)",
                    "Tunggu viral reda bulan depan",
                    "Diam saja",
                    "Ancam dengan UU ITE"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Kecepatan merespons menentukan siapa yang mengontrol narasi.",
                "wrongFeedback": "Menunda atau mengancam akan memperparah krisis."
            },
            {
                "type": "multiple-choice",
                "title": "Holding Statement",
                "scenario": "Fakta belum lengkap tapi wartawan sudah menelpon.",
                "question": "Apa isi holding statement yang ideal?",
                "options": [
                    "Mengakui ada insiden dan sedang investigasi serius",
                    "Menyalahkan pihak ketiga langsung",
                    "Menyangkal keras",
                    "No comment"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Transparansi proses investigasi menenangkan publik.",
                "wrongFeedback": "'No comment' terlihat seperti menyembunyikan sesuatu."
            },
            {
                "type": "written",
                "title": "Pemulihan Reputasi",
                "scenario": "Krisis makanan telah usai, pabrik sudah dibersihkan.",
                "question": "Kampanye apa yang dilakukan untuk mengembalikan trust?",
                "minLength": 5,
                "keywords": [
                    "transparansi",
                    "tur",
                    "buktikan",
                    "influencer"
                ],
                "correctFeedback": "Tepat, menunjukkan aksi nyata memulihkan kepercayaan.",
                "improvementTip": "Bisa mengundang media/influencer untuk tur dapur pabrik.",
                "exampleAnswer": "Membuat kampanye transparansi dapur, menunjukkan higienitas proses produksi secara live."
            }
        ]
    },
    {
        "title": "Hari 7 - Sesi 1: Event Launch",
        "difficulty": "Sangat Sulit",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Pre-Launch Teasing",
                "scenario": "Produk smartphone baru akan rilis 2 minggu lagi.",
                "question": "Taktik apa yang efektif membangun hype?",
                "options": [
                    "Membocorkan siluet desain/fitur sedikit demi sedikit",
                    "Menjual produk pesaing",
                    "Menutup akun media sosial",
                    "Menyebarkan spesifikasi lengkap PDF teknis"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Teaser membangkitkan rasa penasaran.",
                "wrongFeedback": "Bocoran spesifikasi teknis terlalu kaku."
            },
            {
                "type": "multiple-choice",
                "title": "KOL Management di Event",
                "scenario": "Anda mengundang 50 Influencer ke acara peluncuran.",
                "question": "Agar mereka posting di hari H, apa yang harus disiapkan?",
                "options": [
                    "Spot foto Instagramable dan hashtag resmi",
                    "Kursi tanpa meja",
                    "Presentasi 3 jam tanpa jeda",
                    "Layar proyektor blur"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Fasilitasi pembuatan konten agar mereka mudah memposting.",
                "wrongFeedback": "Acara membosankan tidak akan di-post."
            },
            {
                "type": "written",
                "title": "Evaluasi Event",
                "scenario": "Event peluncuran megah, tapi besoknya tidak ada berita di media.",
                "question": "Apa kesalahan tim PR/Marketing pada hari H?",
                "minLength": 5,
                "keywords": [
                    "media",
                    "jurnalis",
                    "press release",
                    "kit"
                ],
                "correctFeedback": "Analisis yang tajam, media butuh bahan rilis.",
                "improvementTip": "Pastikan press kit tersedia dan media di-follow up.",
                "exampleAnswer": "Tidak memberikan press release atau tidak mem-follow up jurnalis yang hadir."
            }
        ]
    },
    {
        "title": "Hari 7 - Sesi 2: Campaign Analytics",
        "difficulty": "Sangat Sulit",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Attribution Model",
                "scenario": "User melihat iklan FB, lalu besoknya cari di Google dan beli.",
                "question": "Model atribusi apa yang memberikan kredit ke iklan FB dan Google?",
                "options": [
                    "Multi-touch / Linear attribution",
                    "Last Click",
                    "First Click",
                    "No attribution"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Multi-touch membagi kredit ke seluruh titik sentuh.",
                "wrongFeedback": "Last click hanya menghargai Google."
            },
            {
                "type": "multiple-choice",
                "title": "CAC (Customer Acquisition Cost)",
                "scenario": "Habis dana Rp10 Juta, dapat 100 pelanggan baru.",
                "question": "Berapa CAC-nya?",
                "options": [
                    "Rp 100.000",
                    "Rp 1.000.000",
                    "Rp 10.000",
                    "Rp 0"
                ],
                "correctAnswer": 0,
                "correctFeedback": "10.000.000 / 100 = 100.000 per user.",
                "wrongFeedback": "Perhitungan matematis dasar: Biaya dibagi Pelanggan."
            },
            {
                "type": "written",
                "title": "Analisis Bounce Rate",
                "scenario": "Landing page promo memiliki bounce rate 95%.",
                "question": "Apa kemungkinan penyebab terbesarnya?",
                "minLength": 5,
                "keywords": [
                    "lambat",
                    "error",
                    "relevan",
                    "loading"
                ],
                "correctFeedback": "Benar, masalah teknis atau ketidaksesuaian janji iklan.",
                "improvementTip": "Selalu cek versi mobile landing page tersebut.",
                "exampleAnswer": "Loading web sangat lambat atau konten tidak nyambung dengan iklan."
            }
        ]
    },
    {
        "title": "Hari 7 - Sesi 3: Marketing ROI",
        "difficulty": "Sangat Sulit",
        "challenges": [
            {
                "type": "multiple-choice",
                "title": "Menghitung LTV",
                "scenario": "Satu pelanggan rata-rata belanja Rp 500rb/bulan selama 2 tahun.",
                "question": "Berapa LTV (Lifetime Value) kasarnya?",
                "options": [
                    "Rp 12.000.000",
                    "Rp 500.000",
                    "Rp 1.000.000",
                    "Rp 24.000.000"
                ],
                "correctAnswer": 0,
                "correctFeedback": "500rb x 24 bulan = 12 Juta.",
                "wrongFeedback": "Harus dikali jumlah bulan."
            },
            {
                "type": "multiple-choice",
                "title": "Rasio LTV:CAC",
                "scenario": "LTV pelanggan adalah Rp 3 juta, CAC-nya Rp 1 juta.",
                "question": "Apakah rasio 3:1 ini dianggap sehat untuk bisnis?",
                "options": [
                    "Ya, ini standar yang sangat sehat",
                    "Tidak, perusahaan rugi",
                    "Tidak, marketing terlalu mahal",
                    "Tidak bisa diukur"
                ],
                "correctAnswer": 0,
                "correctFeedback": "Rasio 3:1 adalah patokan ideal bisnis SaaS/Startup.",
                "wrongFeedback": "Kurang dari 3:1 bahaya, lebih dari 3:1 bagus."
            },
            {
                "type": "written",
                "title": "Justifikasi Budget",
                "scenario": "CFO ingin memotong budget marketing karena dianggap 'buang uang'.",
                "question": "Data apa yang harus Anda tunjukkan untuk mempertahankannya?",
                "minLength": 5,
                "keywords": [
                    "ROI",
                    "ROAS",
                    "revenue",
                    "pendapatan"
                ],
                "correctFeedback": "Tepat, bahasa yang dimengerti finance adalah angka ROI.",
                "improvementTip": "Tunjukkan berapa pendapatan yang hilang jika budget dipotong.",
                "exampleAnswer": "Laporan ROI (Return on Investment) dan ROAS yang menunjukkan iklan menghasilkan keuntungan."
            }
        ]
    }
]
};
