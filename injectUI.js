const fs = require('fs');

let code = fs.readFileSync('src/app/play/page.tsx', 'utf-8');

const injection = `
        {/* Mobile Controls */}
        <div className="md:hidden fixed bottom-6 left-6 grid grid-cols-3 gap-2 opacity-80 z-50">
          <div />
          <button 
            className="bg-[#f6c85f] border-2 border-[#241922] p-4 rounded-xl shadow-[2px_2px_0_#b17732] font-black text-xl flex items-center justify-center active:scale-95" 
            onTouchStart={() => startMobileMove("w")} 
            onTouchEnd={stopMobileMove} 
            onMouseDown={() => startMobileMove("w")} 
            onMouseUp={stopMobileMove} 
            onMouseLeave={stopMobileMove}
          >W</button>
          <div />
          <button 
            className="bg-[#f6c85f] border-2 border-[#241922] p-4 rounded-xl shadow-[2px_2px_0_#b17732] font-black text-xl flex items-center justify-center active:scale-95" 
            onTouchStart={() => startMobileMove("a")} 
            onTouchEnd={stopMobileMove} 
            onMouseDown={() => startMobileMove("a")} 
            onMouseUp={stopMobileMove} 
            onMouseLeave={stopMobileMove}
          >A</button>
          <button 
            className="bg-[#f6c85f] border-2 border-[#241922] p-4 rounded-xl shadow-[2px_2px_0_#b17732] font-black text-xl flex items-center justify-center active:scale-95" 
            onTouchStart={() => startMobileMove("s")} 
            onTouchEnd={stopMobileMove} 
            onMouseDown={() => startMobileMove("s")} 
            onMouseUp={stopMobileMove} 
            onMouseLeave={stopMobileMove}
          >S</button>
          <button 
            className="bg-[#f6c85f] border-2 border-[#241922] p-4 rounded-xl shadow-[2px_2px_0_#b17732] font-black text-xl flex items-center justify-center active:scale-95" 
            onTouchStart={() => startMobileMove("d")} 
            onTouchEnd={stopMobileMove} 
            onMouseDown={() => startMobileMove("d")} 
            onMouseUp={stopMobileMove} 
            onMouseLeave={stopMobileMove}
          >D</button>
        </div>

        <div className="md:hidden fixed bottom-6 right-6 opacity-80 z-50">
          <button 
            className="bg-[#f9a8d4] text-[#831843] border-3 border-[#831843] w-20 h-20 rounded-full shadow-[4px_4px_0_#a74f7a] font-black text-2xl active:scale-95 flex items-center justify-center" 
            onClick={() => interact()}
          >
            E
          </button>
        </div>
`;

// Inject right before the LAST </main>
const lastMainIdx = code.lastIndexOf('</main>');
code = code.substring(0, lastMainIdx) + injection + "\n" + code.substring(lastMainIdx);
fs.writeFileSync('src/app/play/page.tsx', code);
console.log('Injected mobile controls UI');
