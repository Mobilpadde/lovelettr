module.exports = Namer = function(text){
	const Canvas = require("./canvas");
	const name = new Canvas();

	const w = window.innerWidth;
	const h = window.innerHeight;

    name.ctx.fillStyle = "#fff";
    name.ctx.fillRect(0, 0, w, h);

	name.ctx.font = "bold 284px sans-serif";
	name.ctx.textAlign = "center";
	name.ctx.textBaseline = "middle";

	name.ctx.fillStyle = "#000";
	name.ctx.fillText(text, w / 2, h / 2);

	document.body.appendChild(name.canvas);

	return (x, y) => {
		const d = name.ctx.getImageData(x, y, 1, 1).data;

		return (d[0] + d[1] + d[2]) / 3;
	};
};