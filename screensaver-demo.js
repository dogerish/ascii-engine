// basic screensaver rectangle bouncing

let tc = new TextCanvas(100, 50);
let pos = [0, 0];
let size = [5, 5];
let tcsize = [tc.w, tc.h];
let vel = [1, 1];
draw = function()
{
	for (let i = 0; i < 2; i++)
	{
		pos[i] += vel[i];
		// check bounds
		let isoob = true;
		if (pos[i] <= 0) pos[i] = 0;
		else if (pos[i] + size[i] >= tcsize[i]) pos[i] = tcsize[i] - size[i];
		else isoob = false;
		// reverse direction if we hit a wall
		if (isoob) vel[i] *= -1;
	}
	tc.fill(0);
	rect(tc, pos[0], pos[1], size[0], size[1], 0xff00ff);
	tc.update();
}
startAnim();
