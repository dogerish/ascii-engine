const tc = new TextCanvas(100, 50);
let angle = 0;
let length = 25;
let roundAll = (arr) => arr.map(item => Math.round(item));
class Spinny
{
	constructor(pos) { this.pos = pos; }

	getEndPoint()
	{ return [Math.cos, Math.sin].map((f, i) => Math.round(this.pos[i] + f(angle) * length)); }

	draw() { line(tc, [ this.pos, this.getEndPoint() ], Math.floor(Math.random()*0xffffff)); }
}
let sa = new Spinny(roundAll([tc.w/2, tc.h/2]));
let sb = new Spinny([15, 15]);

draw = function()
{
	tc.fill(0);
	sa.draw();
	sb.draw();
	angle += 0.1;
	tc.update();
}
startAnim();
