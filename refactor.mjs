import fs from 'fs';

const code = fs.readFileSync('src/app/play/page.tsx', 'utf-8');
const lines = code.split('\n');

const typeStart = lines.findIndex(l => l.startsWith('type DivisionId ='));
const typeEnd = lines.findIndex(l => l.startsWith('type SavedProgress ='));
const divStart = lines.findIndex(l => l.startsWith('const DIVISIONS: Division[] ='));
const divEnd = lines.findIndex(l => l.startsWith('export default function PlayPage() {'));

if (typeStart !== -1 && typeEnd !== -1 && divStart !== -1 && divEnd !== -1) {
  const p1 = lines.slice(0, typeStart).join('\n');
  const p2 = lines.slice(typeEnd, divStart).join('\n');
  const p3 = lines.slice(divEnd).join('\n');
  
  const imports = `import { DivisionId, Challenge, Division } from "@/data/types";\nimport { DIVISIONS } from "@/data";\n\n`;
  const newCode = imports + p1 + p2 + p3;
  fs.writeFileSync('src/app/play/page.tsx', newCode);
  console.log("SUCCESS");
} else {
  console.log("FAILED TO FIND INDICES", typeStart, typeEnd, divStart, divEnd);
}
