module.exports = Namer = function(text){
	const Canvas = require("./canvas");
	const name = new Canvas();

	const w = window.innerWidth;
	const h = window.innerHeight;

    name.ctx.fillStyle = "#fff";
    name.ctx.fillRect(0, 0, w, h);

	name.ctx.textAlign = "center";
	name.ctx.textBaseline = "middle";

    let size = 284;
    name.ctx.font = "bold " + size + "px sans-serif";

	let tw = name.ctx.measureText(text).width;
	while(tw > w){
        name.ctx.font = "bold " + (--size) + "px sans-serif";
        tw = name.ctx.measureText(text).width;
    }

	name.ctx.fillStyle = "#000";
	name.ctx.fillText(text, w / 2, h / 2);

	return (x, y) => {
		const d = name.ctx.getImageData(x, y, 1, 1).data;

		return (d[0] + d[1] + d[2]) / 3;
	};
};