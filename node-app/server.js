const app = require('./app');
const debuge = require('debug')('node-angular');
const http = require('http');
const port = process.env.PORT || '3000'; // initialize server port

app.set('port', port);

const server = http.createServer(app);
// server.on("error", onError);
// server.on("listening", onListening);
server.listen(port);