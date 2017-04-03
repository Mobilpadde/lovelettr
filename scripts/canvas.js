module.exports = Canvas = function(show){
	const c = document.createElement("canvas");
	const ctx = c.getContext("2d");

	const w = window.innerWidth;
	const h = window.innerHeight;

	c.width = w;
	c.height = h;

	if(show)
		document.body.appendChild(c);

	return {
		canvas: c,
		ctx: ctx
	}
}