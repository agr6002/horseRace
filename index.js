// Get express, which is a function that can be executed.
const express = require("express");

// Execute express, which returns a function handler.
const app = express();

// Get http, which is built in to Node.js for purposes of http interaction.
const http = require("http");

// Create a server, providing express's function handler.
const server = http.createServer(app);

// Get socket.io's Server class.
const { Server } = require("socket.io");

// Get the path module.
const path = require("path");

// Initialize a new instance of socket.io by passing the HTTP server object.
const io = new Server(server);

// Add constants here

const horseNames = {};

// Add variables here

// Use the express.static middleware to serve static files from "public" dir.
app.use(express.static(path.join(__dirname, "public")));

// Listen on the connection event for incoming sockets.
io.on("connection", (socket) => {
  console.log("A user has connected.");

  // Listen to disconnect events.
  socket.on("disconnect", () => {
    console.log("A user has disconnected.");
  });

  // Add other socket.on ... event listeners here.

  // Listen to "horse named" events.
  socket.on("horse named", (message) => {
    // trim any whitespace from both ends of the string
    message = message.trim();
    // validate the string
    if (!message || message.length === 0) {
      socket.emit("invalid name", "No name received. Please name your horse.");
    } else if (message.length > 8) {
      socket.emit("invalid name", "Resubmit a name limited to 8 characters.");
    } else if (horseNames[message]) {
      socket.emit(
        "invalid name",
        "That name is taken. Please resubmit a name."
      );
    } else {
      horseNames[message] = socket;
      socket.emit("valid name");
      console.log("Horse named: " + message);
    }
  });
});

// Tell the server to listen for traffic on port 3000.
server.listen(3000, () => {
  console.log("listening on *:3000");
});

// Add functions here