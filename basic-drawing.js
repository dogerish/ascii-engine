// draws basic things - rectangles and horizontal and vertical lines

// draws a filled in rectangle on the TextCanvas tc
function rect(tc, x, y, w, h, color)
{
	if (color.constructor != Number) return enotnum(color);
	// if width or height are below 0, move x and y to that location and put them back positive
	if (w < 0) x -= w *= -1; if (h < 0) y -= h *= -1;
	// max out at the smallest one
	let max = [(tc.w < x + w) ? tc.w : x + w, (tc.h < y + h) ? tc.h : y + h];
	// if below 0, start at 0 instead
	if (y < 0) y = 0; if (x < 0) x = 0;
	let startx = x;
	for (; y < max[1]; y++)
		for (x = startx; x < max[0]; x++)
			tc.pixels[y * tc.w + x] = color;
}

// draws a l pixel long horizontal line starting at (x, y)
function hline(tc, x, y, l, color)
{
	if (y < 0 || y > tc.h) return;
	if (color.constructor != Number) return enotnum(color);
	// if l is negative, put x back there and make it positive
	if (l < 0) x -= (l *= -1) - 1;
	// cap out at edge of screen or length (l), whichever comes first
	let max = (tc.w < x + l) ? tc.w : x + l;
	y *= tc.w; if (x < 0) x = 0;
	for (; x < max; x++) tc.pixels[x + y] = color;
}

// drawsa l pixel long vertical line starting at (x, y)
function vline(tc, x, y, l, color)
{
	if (x < 0 || x > tc.w) return;
	if (color.constructor != Number) return enotnum(color);
	// if l is negative, put y back there and make it positive
	if (l < 0) y -= (l *= -1) - 1;
	// cap out at edge of screen or length (l), whichever comes first
	let max = (tc.h < y + l) ? tc.h : y + l;
	if (y < 0) y = 0;
	for (; y < max; y++) tc.pixels[x + y * tc.w] = color;
}
