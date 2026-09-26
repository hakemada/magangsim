const fs = require('fs');
let code = fs.readFileSync('src/app/play/page.tsx', 'utf-8');

const labelsToReplace = [
  '<span>DIVISI</span>',
  '<span>SESI</span>',
  '<span>WAKTU SESI</span>',
  '<span>ENERGY SESI</span>',
  '<span>{selectedDivision?.skillName ?? "SKILL"}</span>',
  '<span>REPUTASI</span>'
];

labelsToReplace.forEach(label => {
  const newLabel = label.replace('<span', '<span style={{ fontFamily: "var(--font-silkscreen)" }}');
  code = code.replace(label, newLabel);
});

const scenarioSearch = `<div className="mt-2">
                  {currentChallenge.scenario.split('\\n').map((line, i) => 
                    line.trim().startsWith('|') ? (
                      <div key={i} className="font-mono text-xs whitespace-pre bg-white/50 px-1">{line}</div>
                    ) : (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                    )
                  )}
                </div>`;

const scenarioReplace = `<div className="mt-2" style={{ fontFamily: "var(--font-vt323)", fontSize: "1.15rem", lineHeight: "1.3" }}>
                  {currentChallenge.scenario.split('\\n').map((line, i) => 
                    line.trim().startsWith('|') ? (
                      <div key={i} className="whitespace-pre bg-white/50 px-1">{line}</div>
                    ) : (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                    )
                  )}
                </div>`;

code = code.replace(scenarioSearch, scenarioReplace);

fs.writeFileSync('src/app/play/page.tsx', code);
console.log('Applied Silkscreen and VT323');
