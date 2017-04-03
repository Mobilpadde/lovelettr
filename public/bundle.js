(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{"./canvas":1,"./heart":3,"./namer":5}],3:[function(require,module,exports){
module.exports = Heart = function(x, y, r, g, b, a){
    let radius = 0;
    let max = Math.max(1, Math.random() * 10);

    return {
        draw: (ctx) => {
            const half = radius / 2;
            const sixths = half / 4;

            ctx.beginPath();
            ctx.save();
            ctx.translate(x, y);

            ctx.arc(-half + sixths, 0, half, 0, Math.PI * 2);
            ctx.arc(half - sixths, 0, half, 0, Math.PI * 2);

            ctx.translate(0, -half + sixths);
            ctx.rotate(Math.PI / 4);
            ctx.rect(0, 0, radius, radius);
            ctx.restore();

            ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
            ctx.fill();

            if(radius < max)
                radius += 0.1;
        },

        circumference: () => {

        }
    };
};
},{}],4:[function(require,module,exports){
window.addEventListener("load", require("./drawer"));
},{"./drawer":2}],5:[function(require,module,exports){
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
},{"./canvas":1}]},{},[4]);
