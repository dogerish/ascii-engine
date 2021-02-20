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
// in 10 seconds, make a hue slide
function hue2hex(hue)
{
	// the part of the color that will be changing
	let color = hue % 0xff;
	// determines where the changing color and static color will be, and which format to use
	// increments every 0xff (one full color/byte) and loops every 6 steps because there are only 6
	let steps = Math.floor(hue / 0xff) % 6;
	/*
	alternate between formats every step.
	the format is either 0xff<color>00 or 0x<ff - color>ff00
	the colors shift right (and loop around) every other step
		step 0, color 0x20: 0xff2000
		step 1, color 0x20: 0xdfff00
		step 2, color 0x20: 0x00ff20
		step 3, color 0x20: 0x00dfff
		(...)
	as shown above, there are 2 important colors and 1 which is always 0
	we can figure out the position of each color by dividing steps by 2
		however, this will be the opposite of how far we need to shift the bits
		each color takes a byte, so we must multiply the position by 8 (bits)
		then to invert it, we do 16 - the position, so it will shift 16, then 8, then 0 bits
	for the second one, we do the same thing but just offset by one
		same first step as the first one
		now we need to offset it by one, so we do -1 + steps / 2
		but this will produce negatives, which we don't want, so change it to 4 - steps / 2
		but this will be too far, so we mod it by 3 (it will loop around every 3) -> (4 - steps / 2) % 3
		then we need to multiply it by 8 to convert it to bytes
		we don't need to invert again because we already did that with "4 - "
	*/
	/*
	step-by-step following code
	(((steps % 2) ? 0xff - color : 0xff) << 16 - Math.floor(steps / 2) * 8) + (((steps % 2) ? 0xff : color) << (4 - Math.floor(steps / 2)) % 3 * 8)
	1. (((steps % 2) ? 0xff - color : 0xff) << 16 - Math.floor(steps / 2) * 8)
		a. ((steps % 2) ? 0xff - color : 0xff)
			choose what the first color of the format will be
		b. << 16 - Math.floor(steps / 2) * 8
			shift the first color right 8 bits every other step
	2. (((steps % 2) ? 0xff : color) << (4 - Math.floor(steps / 2)) % 3 * 8)
		a. ((steps % 2) ? 0xff : color)
			(same as for #1)
		b. << (4 - Math.floor(steps / 2)) % 3 * 8)
			shift the second color right every other bit, but offset it by 1 byte
			mod it by 3 to make it loop around every 3
	3. add these to results to create the hex color - no need to add in a 0
	*/
	return (
		(((steps % 2) ? 0xff - color : 0xff) << 16 - Math.floor(steps / 2) * 8) +
		(((steps % 2) ? 0xff : color) << (4 - Math.floor(steps / 2)) % 3 * 8)
	);
}
setTimeout(() =>
{
	let step = 0xff * 6 / tc.h;
	for (let y = 0; y < tc.h; y++)
		hline(tc, 0, y, tc.w, hue2hex(y*step));
	tc.update();
}, 1000);
