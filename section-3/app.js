const http = require('http');
const fs = require('fs');

const routes=require('./routes');

const server = http.createServer(routes);  //will exexute function for incoming requestsn

server.listen(3000);
