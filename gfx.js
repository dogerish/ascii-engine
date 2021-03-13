// basic grafics things - diagonal line

// draw diagonal line
// tc: TextCanvas object to draw to
// coords: 2d array containing the start and end coordinates; [ [x0, y0], [x1, y1] ]
// color: hexadecimal number; 0xRRGGBB
function line(tc, coords, color)
{
	if (color.constructor != Number) return notnum(color);
	// get slope
	let m = (coords[1][1] - coords[0][1]) / (coords[1][0] - coords[0][0]);
	let tcsize = [tc.w - 1, tc.h - 1];

	// trims the line segment's coord so that the coord's index i is at the target and the
	// opposite index is at the respective position on the line segment
	function trimPoint(coord, i, target)
	{
		let diff = coord[i] - target;
		coord[(i + 1) % 2] -= Math.round(diff * (i ? 1/m : m));
		coord[i] = target;
	}
	// trim line so we only draw what will be on screen
	for (let coord of coords)
		coord.forEach((v, i) =>
			{ if (v < 0 || v > tcsize[i]) trimPoint(coord, i, (v >= 0)*tcsize[i]); }
		);

	// draw the line
	// more vertical than horizontal, go one y level at a time
	if (Math.abs(m) > 1)
	{
		// count down instead of up if the second coordinate is smaller
		let count = coords[1][1] - coords[0][1];
		let coef = count / Math.abs(count);
		let expr = (count < 0) ? t => (t >= count) : t => (t <= count);
		// calculate x component for each y value and then set the pixel
		for (let t = 0; expr(t); t += coef)
			tc.setpixel(Math.round(coords[0][0] + t/m), coords[0][1] + t, color);
	}
	// more horizontal than vertical, go one x level at a time
	else
	{
		// count down instead of up if the second coordinate is smaller
		let count = coords[1][0] - coords[0][0];
		let coef = count / Math.abs(count);
		let expr = (count < 0) ? t => (t >= count) : t => (t <= count);
		// calculate y component for each x value and then set the pixel
		for (let t = 0; expr(t); t += coef)
			tc.setpixel(coords[0][0] + t, Math.round(coords[0][1] + t*m), color);
	}
}
