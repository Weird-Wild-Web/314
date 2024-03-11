const PI_DIGITS: string = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233";
const PI_ARRAY: string[] = PI_DIGITS.split('');

const CANVAS: HTMLCanvasElement | null = document.getElementById('rain') as HTMLCanvasElement;
const CTX: CanvasRenderingContext2D | null = CANVAS?.getContext('2d');

function resizeCanvas(): void {
  if (CANVAS) {
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
  }
}

resizeCanvas();

const symbolSize: number = 16;
let columns: number = Math.ceil(CANVAS?.width / symbolSize) || 0;
let drops: number[] = [];

function initDrops(): void {
  drops = [];
  for (let i: number = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * (CANVAS?.height || 0) / symbolSize) + 1;
  }
}

function draw(): void {
  if (CTX) {
    CTX.fillStyle = 'rgba(227, 235, 250, 0.05)';
    CTX.fillRect(0, 0, CANVAS?.width || 0, CANVAS?.height || 0);

    CTX.fillStyle = '#bdcee0';
    CTX.font = `${symbolSize}px monospace`;

    for (let i: number = 0; i < drops.length; i++) {
      const piDigit: string = PI_ARRAY[i % PI_ARRAY.length];
      const dropChar: string = piDigit;

      const x: number = i * symbolSize;
      const y: number = drops[i] * symbolSize;

      if (CTX) {
        CTX.fillText(dropChar, x, y);

        if (y >= (CANVAS?.height || 0) && Math.random() > 0.95) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }
  }
}

window.addEventListener('resize', function() {
  resizeCanvas();
  columns = Math.ceil(CANVAS?.width / symbolSize) || 0;
  initDrops();
});

initDrops();

setInterval(draw, 50);
