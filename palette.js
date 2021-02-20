// the color palette for TextCanvas to choose from
const TC_CLRPAL =
[
	// name      hue saturation"
	"white       *   0.25",
	"red         0   1",
	"orange      30  1",
	"yellow      60  1",
	"yellowgreen 80  1",
	"lime        120 1",
	"turquoise   180 1",
	"blue        240 1",
	"purple      270 1",
	"magenta     300 1"
];

// the character palette for TextCanvas to choose from
// in order of emptiest to lightest
const TC_CHARPAL = " .-+!?%$#@";

// turn TC_CLRPAL an array of objects with name, hue, and saturation properties
// parse strings into objects
let i = 0;
while (i < TC_CLRPAL.length)
{
	// find <word><whitespace><word><whitespace><word> and extract the <word>s
	let ret = TC_CLRPAL[i].match(/^(\S+)\s+(\S+)\s+(\S+)/);
	// not valid; remove from palette and error
	if (ret == null) console.error("Invalid colordef:", TC_CLRPAL.splice(i, 1));
	// change data to object and increment i
	else TC_CLRPAL[i++] =
	{
		"name": ret[1],
		"hue": (ret[2] == '*') ? null : Number(ret[2]),
		"saturation": Number(ret[3])
	};
}
