// Connect to socket.io
var socket = io();

// Create references to the relevant HTML elements.
const form = document.getElementById("form");
const input = document.getElementById("input");
const can = document.getElementById("canvas");
const con = can.getContext("2d");

// Get references to the 6 horse images
const horseImages = [];
for (let i = 0; i < 6; ++i) {
  horseImages[i] = document.getElementById("horse" + i);
}

// Listen for "invalid name" event
socket.on("invalid name", (message) => {
  input.setAttribute("placeholder", message);
});

// Listen for "valid name" event
socket.on("valid name", (message) => {
  form.style.display = "none";
});

// Listen for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    // Emit a "horse named" event when the form is submitted.
    socket.emit("horse named", input.value);
    input.value = "";
  }
});

window.onresize = resize;
resize();
requestAnimationFrame(animate);

function animate() {
  con.clearRect(0, 0, can.width, can.height);
  for (let i = 0; i < 6; ++i) {
    con.drawImage(
      horseImages[i],
      0.9 * can.width,
      0.1 * i * can.height,
      0.1 * can.width,
      0.1 * can.height
    );
  }
  requestAnimationFrame(animate);
}

function resize() {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
}
