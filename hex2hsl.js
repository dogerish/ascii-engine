// convert hex color to hsl - returns array of [hue, saturation, lightness]
function hex2hsl(hex)
{
	// extract and normalize values
	let colors = [];
	for (let i = 16; i >= 0; i -= 8)
		colors.push(((hex >> i) & 0xff) / 0xff);
	// get max and min values
	let max; let min;
	for (let c of colors)
	{
		if (max == undefined || c > max) max = c;
		if (min == undefined || c < min) min = c;
	}
	// difference bt max and min
	let diff = max - min;

	// calc hue
	let hue = 0;
	if (diff)
		switch (colors.indexOf(max))
		{
			case 0:
				hue = 60*((colors[1] - colors[2]) / diff % 6);
				break;
			case 1:
				hue = 60*((colors[2] - colors[0]) / diff + 2);
				break;
			case 2:
				hue = 60*((colors[0] - colors[1]) / diff + 4);
				break;
		}
	if (hue < 0) hue += 360;
	// saturation is 0 if diff is 0, otherwise it's diff / (1 - |min+max - 1|)
	return [hue, diff ? diff / (1 - Math.abs(min + max - 1)) : 0, (min + max) / 2];
}
