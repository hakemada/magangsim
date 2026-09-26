const fs = require("fs");
const path = require("path");

function buildTsFile(divisionId, name, skillName, description, deskLabel, color, mayaBriefing) {
  const jsonPath = path.join(__dirname, "src/data/divisions", `${divisionId}_data.json`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`File ${jsonPath} not found`);
    return;
  }
  
  let jsonData = fs.readFileSync(jsonPath, "utf-8");
  // Some LLMs might wrap the JSON in markdown blocks
  if (jsonData.includes("\`\`\`json")) {
    jsonData = jsonData.split("\`\`\`json")[1].split("\`\`\`")[0];
  } else if (jsonData.includes("\`\`\`")) {
    jsonData = jsonData.split("\`\`\`")[1].split("\`\`\`")[0];
  }
  
  let sessions;
  try {
    sessions = JSON.parse(jsonData);
  } catch (e) {
    console.error(`Error parsing ${jsonPath}:`, e);
    return;
  }

  // Ensure 21 sessions, 3 challenges each
  console.log(`${divisionId} loaded. Sessions: ${sessions.length}`);
  
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
  console.log(`Generated ${divisionId}.ts`);
}

buildTsFile(
  "accounting", "Akuntansi", "Ketelitian",
  "Memeriksa transaksi, menjaga akurasi data, dan mendukung keputusan berbasis laporan keuangan.",
  "MEJA FINANCE", "#93c5fd",
  [
    "Di Akuntansi, angka bukan sekadar angka. Setiap nominal menceritakan aktivitas bisnis.",
    "Tugasmu adalah memastikan data dapat dipercaya sebelum tim mengambil keputusan.",
    "Mulai dari pemeriksaan sederhana, lalu biasakan menjelaskan alasan di balik keputusanmu."
  ]
);

buildTsFile(
  "marketing", "Marketing", "Analisis Pasar",
  "Pelajari riset tren pasar, menyusun pesan brand, dan merencanakan kampanye promosi yang efektif.",
  "MEJA MARKETING", "#fca5a5",
  [
    "Sebagai marketer, tugasmu adalah menyampaikan nilai brand kita ke audiens yang tepat.",
    "Tidak sekadar membuat konten menarik, tapi juga mengukur efektivitasnya.",
    "Fokuslah pada kebutuhan target pasar saat kamu mengambil keputusan."
  ]
);

buildTsFile(
  "hr", "Human Resources", "Problem Solving",
  "Kelola siklus hidup karyawan, dari rekrutmen hingga penyelesaian konflik.",
  "MEJA HR", "#d8b4fe",
  [
    "Di HR, kamu adalah jembatan antara kebutuhan perusahaan dan kesejahteraan karyawan.",
    "Setiap keputusanmu akan berdampak langsung pada motivasi dan budaya kerja.",
    "Gunakan empati dan logika objektivitas dalam menyelesaikan studi kasus."
  ]
);
