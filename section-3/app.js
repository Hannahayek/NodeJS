const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
const url=req.url;
const method=req.method;
if(url==='/'){
    res.setHeader('Content-Type','text/html');
    res.write('<html><head><title>Enter message</title><body><form action="/message" method="POST"><input type="text"><button type="submit">Send</button></form></body></head></html>');
   return res.end(); //this will quit the function execution 
}
    if(url==='/message' && method==='POST'){
     fs.writeFileSync('message.txt','Dummay ');
     res.statusCode=302;
     res.setHeader('Location','/');
      return res.end(); 
    }
    console.log(req.url,req.method,req.headers);
    res.setHeader('Content-Type','text/html');
    res.write('<html><head><title>my first page</title><body>hello from my node.js server</body></head></html>');
    res.end();
});

server.listen(3000);