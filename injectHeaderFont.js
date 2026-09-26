const fs = require('fs');

['src/app/play/page.tsx', 'src/app/dashboard/page.tsx', 'src/app/result/page.tsx'].forEach(file => {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf-8');
    code = code.replace(
      />\s*MAGANG SIM\s*<\/h1>/g,
      ' style={{ fontFamily: "var(--font-press-start)", fontSize: "1.2rem", letterSpacing: "normal" }}>MAGANG SIM</h1>'
    );
    fs.writeFileSync(file, code);
  }
});
console.log('Applied Press Start 2P to headers');
