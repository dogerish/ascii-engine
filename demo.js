// demo of this engine
const tc = new TextCanvas(100, 50);
// make a gradient!
let step = 0xff/tc.w;
for (let x = 0; x < tc.w; x++)
{
	let c = Math.round(x*step);
	vline(tc, x, 0, tc.h, (c << 16) + (c << 8) + c);
}
tc.update();
