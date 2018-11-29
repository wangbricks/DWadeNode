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


function readFile (req, res) {
    var pathname=__dirname+url.parse(req.url).pathname;
    //根目录设置很重要  没有输入文件路径
    if (path.extname(pathname)=="") {
        pathname+="/";
    }
    if (pathname.charAt(pathname.length-1)=="/"){
        pathname+="index.html";
    }

    fs.exists(pathname,function(exists){
        if(exists){
            switch(path.extname(pathname)){
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

            fs.readFile(pathname,function (err,data){
                if(err){
                    res.end("<h1>read err</h1>")
                    return
                }
                res.end(data);
            });
        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("<h1>404 Not Found</h1>");
        }
    });
}




