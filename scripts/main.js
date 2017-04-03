window.addEventListener("load", () => {
    require("./drawer")();

    window.addEventListener("hashchange", () => window.location.reload());
});