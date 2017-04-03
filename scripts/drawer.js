module.exports = Drawer = function(){
	const Canvas = require("./canvas");
	const Namer = require("./namer");
	const Heart = require("./heart");

	let hash = "Charlotte";
	if(window.location.hash !== "")
		hash = window.location.hash.substring(1);

	const board = new Canvas(true);
	const shape = new Namer(hash);

	const colors = {
		red: [255, 75, 75, 0.75],
		gray: [75, 75, 75, 0.1]
	};
	const limit = 255 / 2;
	const speed = Math.min(Math.random() * 500, 50);

	const heartsPrCycle = 25;
	const hearts = [];
	const draw = () => {
		const c = board.canvas;
		const ctx = board.ctx;

		ctx.clearRect(0, 0, c.width, c.height);

		const now = new Date().getTime();
		if(time + speed < now){
			for(let i = 0; i < heartsPrCycle; i++){
                const x = ~~(Math.random() * board.canvas.width);
                const y = ~~(Math.random() * board.canvas.height);

                if(shape(x, y) < limit)
                    hearts.push(new Heart(x, y, ...colors.red));
                else if(Math.random() > 0.9)
                    hearts.push(new Heart(x, y, ...colors.gray));
			}

            time = now;
        }

		hearts.map(heart => heart.draw(ctx));

		requestAnimationFrame(draw);
	};

	let time = new Date().getTime();
    requestAnimationFrame(draw)
};