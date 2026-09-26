const fs = require('fs');

let code = fs.readFileSync('src/app/play/page.tsx', 'utf-8');
const searchStr = '  const [notice, setNotice] = useState(';

const injection = `
  const mobileMoveInterval = useRef<number | null>(null);

  const startMobileMove = (dir: string) => {
    if (mobileMoveInterval.current) return;
    
    const step = () => {
      const speed = 14;
      let moveX = 0;
      let moveY = 0;
      let nextDirection: PlayerDirection | null = null;

      if (dir === "w") {
        moveY = -speed;
        nextDirection = "up";
      } else if (dir === "s") {
        moveY = speed;
        nextDirection = "down";
      } else if (dir === "a") {
        moveX = -speed;
        nextDirection = "left";
      } else if (dir === "d") {
        moveX = speed;
        nextDirection = "right";
      }

      if (nextDirection) {
        setDirection(nextDirection);
      }
      setIsMoving(true);

      setPosition((current) => ({
        x: Math.max(20, Math.min(900, current.x + moveX)),
        y: Math.max(20, Math.min(470, current.y + moveY)),
      }));
    };
    
    step();
    mobileMoveInterval.current = window.setInterval(step, 50);
  };

  const stopMobileMove = () => {
    if (mobileMoveInterval.current) {
      window.clearInterval(mobileMoveInterval.current);
      mobileMoveInterval.current = null;
    }
    setIsMoving(false);
  };
`;

code = code.replace(searchStr, injection + "\n" + searchStr);
fs.writeFileSync('src/app/play/page.tsx', code);
console.log('Injected mobile logic');
