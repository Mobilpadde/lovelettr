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

            ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + Math.min(a, radius / max) + ")";
            ctx.fill();

            if(radius < max)
                radius += 0.1;
        },

        circumference: () => {

        }
    };
};