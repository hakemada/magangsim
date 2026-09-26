const fs = require('fs');

let code = fs.readFileSync('src/app/play/page.tsx', 'utf-8');

const targetStr = '<main className="min-h-screen bg-[#35131f] px-4 py-5 text-[#241922]">';

const overlay = `
      {/* Force Landscape Overlay */}
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#241922] text-[#fff1c9] md:hidden landscape:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 animate-pulse text-[#f9a8d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <p className="mt-6 text-center text-lg font-black px-8 uppercase tracking-widest text-[#f9a8d4]">
          Putar Layar HP Anda
        </p>
        <p className="mt-2 text-center text-sm px-8 font-bold text-[#fff1c9]">
          Game ini hanya dapat dimainkan dalam mode Landscape (Miring).
        </p>
      </div>
`;

code = code.replace(targetStr, targetStr + "\n" + overlay);

fs.writeFileSync('src/app/play/page.tsx', code);
console.log('Injected landscape overlay');
