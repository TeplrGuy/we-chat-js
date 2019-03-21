const url = require('url');
var WebSocketServer = require('ws').Server;
const sl = require('server-lite');
const om = require('output-manager')
const stringz = require('string-utilz');
const output = new om.Out();

const utilz = new sl.utils(output);
const handler = new sl.handler(utilz, 'index.html',);
var PORT = 8080;

var wss = new WebSocketServer({
    port: PORT
});

function onReq(request, response) {
    output.i('Recieved request...');
    let tmpPath = url.parse(request.url).pathname;
    output.i(stringz.fmt('...for path "%{s}"', tmpPath));
    switch (tmpPath) {
        default:
            output.i('simple web server request');
            handler.simpleFileBasedWebServer(request, response);
            break;
    }
}

var messages = [];
wss.on('connection', function (ws) {
//   messages.forEach(function(message){
//     console.log("Send message back to client", message)
//     ws.send(message);
//   });
  ws.on('message', function (message) {
    messages.push(message);
    console.log('Message Received: %s', message);
    wss.clients.forEach(function (conn) {
        //console.log("Send message back to client", message)
      conn.send(message);
    }); 
  });
});

const config = new sl.config({
    out: output,
    port: 9999,
    onRequest: onReq

});

const httpServer = new sl.server.http(config);
httpServer.start();

