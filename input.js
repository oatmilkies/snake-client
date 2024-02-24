const { keyMappings } = require("./constants");

// Stores the active TCP connection object.
let connection;

// setup interface to handle user input from stdin
const setupInput = function(conn) {
  connection = conn;

  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  stdin.on("data", handleUserInput);
  return stdin;
};

const handleUserInput = function(key) {
  if (key === '\u0003') {
    process.exit();
  } else if (["w", "a", "s", "d", "m", "h", "p"].includes(key)) {
    connection.write(keyMappings[key]);
  } else if (!["w", "a", "s", "d", "m", "h", "p"].includes(key)) {
    connection.write("Say: nah");
  }
};

module.exports = {
  setupInput
};
