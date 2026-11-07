const EventEmitter = require("node:events");
const classroom = new EventEmitter();

classroom.on("student-entered", (name) => {
  console.log(`${name} entered the class.`);
});

classroom.on("entered", (name) => {
  console.log(`${name} entered the class.`);
});

classroom.on("student", (name) => {
  console.log(`${name} entered the class.`);
});

classroom.emit("student-entered", "data");

classroom.on("student", (data) => {});


