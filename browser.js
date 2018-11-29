//获取ip
var os = require("os")
var interface = os.networkInterfaces()
var ip=""
for( var name in interface ){
    if( name == "以太网" ){
        interface[name].forEach(res=>{
            if(res['family'] == "IPv4"   ){
                ip = res['address']
            }
        })
    }   
}
//打开浏览器
var exec = require("child_process").exec;
function openBrowser(port){
    let url = "http://"+ip
    switch(process.platform){
        case "win32":
            exec("start "+url+":"+port)
        break;
    }
}
//创建服务
var http=require("http");
var server = http.createServer(readFile)
server.listen(9090)
server.on("listening",()=>{
    openBrowser(9090)
})

var url = require("url")
var path = require("path")
var fs = require("fs")
function readFile(req,res,next){
    var pathurl=path.join(__dirname, req.url);
    var parseurl= url.parse(pathurl);
    // __dirname+url.parse(req.url)

    let pathname = parseurl.pathname;
    console.log(pathname)
    if( pathname.charAt(pathname.length-1)  != "/" ){
        pathname+="/"
    }
    pathname+="index.html";
    fs.exists(pathname,(exists)=>{
        if(exists){
            switch( path.extname(pathname) ){
                case ".html":
                    res.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case ".js":
                    res.writeHead(200, {"Content-Type": "text/javascript"});
                    break;
                case ".css":
                    res.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case ".gif":
                    res.writeHead(200, {"Content-Type": "image/gif"});
                    break;
                case ".jpg":
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                    break;
                case ".png":
                    res.writeHead(200, {"Content-Type": "image/png"});
                    break;
                default:
                    res.writeHead(200, {"Content-Type": "application/octet-stream"});
            }
            fs.readFile(pathname,(err,data)=>{
                if(err){
                    res.end("<h1>read err</h1>")
                }else{
                    res.end(data)
                }
            })
        }else{
            res.writeHeader(404,{
                "Content-Type":"text/html"
            })
            res.end("<h1>not found</h1>")
        }
        
    })
}




