const http=require('http');
const server=http.createServer((req,res)=>{
    console.log(req.url,req.method,req.headers);
    res.setHeader('Content-Type','text/html');
    res.write('<html><head><title>my first page</title><body>hello from my node.js server</body></head></html>');
    res.end();
});

server.listen(3000);