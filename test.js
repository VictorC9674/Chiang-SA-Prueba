import "index.js"

var myArgs = process.argv.slice(2);
var userStart = myArgs[0];
var userEnd =  myArgs[1];

var distance = calculateDistanceBetweenUsers(userStart,userEnd);

console.log("Distancia entre '" + userStart + "' y '" + userEnd + "', es: " + distance);
