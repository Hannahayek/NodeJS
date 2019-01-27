const http=require('http');
const server=http.createServer((req,res)=>{
const url=req.url;
if(url==='/'){
    res.setHeader('Content-Type','text/html');
    res.write('<html><head><title>Enter message</title><body><form action="/message" method="POST"><input type="text"><button type="submit">Send</button></form></body></head></html>');
   return res.end(); //this will quit the function execution 
}

    console.log(req.url,req.method,req.headers);
    res.setHeader('Content-Type','text/html');
    res.write('<html><head><title>my first page</title><body>hello from my node.js server</body></head></html>');
    res.end();
});

server.listen(3000);