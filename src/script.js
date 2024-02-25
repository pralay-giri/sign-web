"use strict";
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
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let config = {
    fontSize: font.value,
    color: color.value,
};
let writeMode = 0;

const getposition = (event) => {
    const x = event.clientX - rect.x;
    const y = event.clientY - rect.y;
    return [x, y];
};

const handleMove = (e) => {
    if (!writeMode) return;
    const [x, y] = getposition(e);
    ctx.lineTo(x, y);
    ctx.lineWidth = config.fontSize;
    ctx.strokeStyle = config.color;
    ctx.lineCap = "round";
    ctx.stroke();
};

const handlePointerDown = (e) => {
    writeMode = 1;
    ctx.beginPath();
    const [x, y] = getposition(e);
    ctx.moveTo(x, y);
};

const handlePointerUp = () => {
    writeMode = 0;
};

const handleFont = (e) => {
    config.fontSize = e.target.value;
    fontValue.innerHTML = e.target.value + "px";
};

const handleColor = (e) => {
    config.color = e.target.value;
    canvas.style.backgroundColor = "black";
};

const handleClear = () => {
    ctx.clearRect(0, 0, rect.width, rect.height);
    output.src = "./media/out.png";
};

const handleCreateBtn = () => {
    const data = canvas.toDataURL();
    output.src = data;
    if (config.color === "white" || config.color === "#ffffff") {
        outputDiv.style.backgroundColor = "black";
    }
};

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = output.src;
    a.download = "SIGN_WEB";
    a.click();
};

const handeFocus = () => {
    document.documentElement.style.overflow = "hidden";
};

const handleOutOfFocus = () => {
    document.documentElement.style.overflow = "auto";
};

canvas.addEventListener("mouseenter", handeFocus);
canvas.addEventListener("mouseleave", handleOutOfFocus);
canvas.addEventListener("pointerdown", handlePointerDown);
canvas.addEventListener("pointermove", handleMove);
canvas.addEventListener("pointerup", handlePointerUp);
font.addEventListener("change", handleFont);
color.addEventListener("change", handleColor);
clearBtn.addEventListener("click", handleClear);
createBtn.addEventListener("click", handleCreateBtn);
download.addEventListener("click", handleDownload);
