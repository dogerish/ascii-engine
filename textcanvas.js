// the display surface for the engine
class TextCanvas
{
	/*
	width, height, HTML id (optional) and CSS classList (optional) to apply to the pre
	the pre is created with the text-canvas CSS class
	prePlacer should be a function that places the pre on the HTML document.
	it will be given the pre object as its sole argument.
	if prePlacer is not given, the pre will be appended to the document body.
	*/
	constructor(w, h, id, classList, prePlacer)
	{
		this.w = w;
		this.h = h;
		this.pixels = [];
		// fill with blank pixels
		for (let i = 0; i < w*h; i++)
			this.pixels.push(0);

		// create container
		this.pre = document.createElement("pre");
		// assign id and classes as specified
		if (id) this.pre.id = id;
		this.pre.classList = "text-canvas" + (classList ? ` ${classList}` : "");
		// place the pre on the page
		if (prePlacer) prePlacer(this.pre);
		else document.body.appendChild(this.pre);
	}

	// convert hexadecimal rgb value to a character and color
	// returns an array containing a character and color name
	textify(hue, sat, light)
	{
		// find best (lowest difference bt hue and saturation) color name from the palette
		let best = []; // [score, name]
		for (let color of TC_CLRPAL)
		{
			// diff of hue + diff of sat ( multiplied by 2 if hue is all (* -> null) )
			const satdiff = Math.abs(sat - color.saturation);
			let score = (color.hue == null) ?
				satdiff*2 :
				Math.abs(hue - color.hue) / 360 + satdiff;
			if (best[0] == null || score < best[0]) best = [score, color.name];
			if (!score) break;
		}
		// character is selected by turning lightness into an index of TC_CHARPAL
		return [TC_CHARPAL[Math.floor(light * (TC_CHARPAL.length - 1))], best[1]];
	}
	// push the pixel buffer to the display surface
	update()
	{
		// just to hold things before showing them
		let out = "";
		let color;
		let rawcolor;
		let ch;
		for (let i = 0; i < this.pixels.length; i++)
		{
			// new line every row
			if (i && !(i % this.w)) out += "<br>";
			// don't recalculate the same color every pixel
			if (this.pixels[i] == rawcolor) { out += ch; continue; }
			rawcolor = this.pixels[i];

			let data = this.textify.apply(null, hex2hsl(this.pixels[i]));
			// switch colors if we need to
			if (data[1] != color)
			{
				// add closing tag if we've opened a font tag
				if (color != undefined) out += "</font>"
				out += `<font color="${data[1]}">`;
				color = data[1];
			}
			out += ch = data[0];
		}
		// add font if it has content
		if (color != undefined) out += "</font>";
		this.pre.innerHTML = out;
	}

	// sets the pixel at (x, y) to be the color (as hex)
	setpixel(x, y, color)
	{
		if (x >= 0 && x < this.w && y >= 0 && y < this.h && color.constructor == Number)
			return this.pixels[y * this.w + x] = color;
		else if (color.constructor != Number) enotnum(color);
		else eoob(x, y);
	}

	// fills the screen with color
	fill(color)
	{
		if (color.constructor != Number) return notnum(color);
		for (let i = 0; i < this.w*this.h; i++)
			this.pixels[i] = color;
	}
}
