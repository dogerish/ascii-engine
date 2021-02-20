// draws basic things - rectangles and horizontal and vertical lines

// draws a filled in rectangle on the TextCanvas tc
function rect(tc, x, y, w, h, color)
{
	if (color.constructor != Number)
		return console.error(color, "is not a number");
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
