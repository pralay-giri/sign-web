const canvas = document.getElementById("canvas");
const font = document.getElementById("font");
const color = document.getElementById("color");
const clearBtn = document.querySelector(".clear-btn");
const createBtn = document.querySelector(".create-btn");
const output = document.querySelector(".output-img");
const outputDiv = document.querySelector(".output");
const download = document.querySelector(".download");
const fontValue = document.querySelector(".font-value");
const rect = canvas.getClientRects()[0];
canvas.style.backgroundColor = "white";
canvas.width = 800;
canvas.height = 400;
const ctx = canvas.getContext("2d");
const a = document.createElement("a");

let writeMode = 0;

const handleMove = (e) => {
    if (!writeMode) return;

    console.log("on move start");
    ctx.lineTo(e.clientX - rect.x, e.clientY - rect.y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = font.value;
    ctx.strokeStyle = color.value;
    ctx.stroke();

    console.log("on move end");
};

const handlePointerDown = (e) => {
    writeMode = 1;
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.x, e.clientY - rect.y);
};

const handlePointerUp = () => {
    writeMode = 0;
    ctx.closePath();
};

const handleFont = (e) => {
    config.fontSize = e.target.value;
    fontValue.innerHTML = e.target.value + "px";
};

const handleColor = (e) => {
    config.color = e.target.value;
};

const handleClear = (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    output.src = "./media/out.png";
};

const handleCreateBtn = (e) => {
    const data = canvas.toDataURL();
    output.src = data;
    if (config.color === "white" || config.color === "#ffffff") {
        outputDiv.style.backgroundColor = "black";
    }
};

const handleDownload = () => {
    a.href = output.src;
    a.download = "SIGN_WEB";
    a.click();
};

const handleFocus = () => {
    document.documentElement.style.overflow = "hidden";
};

const handleOutOfFocus = () => {
    writeMode = 0;
    document.documentElement.style.overflow = "auto";
};

const handleTouchMove = (e) => {
    console.log("move");
    if (e.changedTouches.length > 1) {
        alert("only one finger");
        return;
    }

    const cord = {
        clientX: e.changedTouches[0].clientX,
        clientY: e.changedTouches[0].clientY,
    };
    handleMove(cord);
};

// mouse event
canvas.addEventListener("mouseenter", handleFocus);
canvas.addEventListener("mouseleave", handleOutOfFocus);

canvas.addEventListener("mousedown", handlePointerDown);
canvas.addEventListener("mousemove", handleMove);
canvas.addEventListener("mouseup", handlePointerUp);

//touch event
canvas.addEventListener("touchstart", handleFocus);
canvas.addEventListener("touchmove", handleTouchMove);
canvas.addEventListener("touchend", handleOutOfFocus);

font.addEventListener("change", handleFont);
color.addEventListener("change", handleColor);
clearBtn.addEventListener("click", handleClear);
createBtn.addEventListener("click", handleCreateBtn);
download.addEventListener("click", handleDownload);
