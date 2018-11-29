var express = require("express")
var app = express()
var bodyParser = require("body-parser")
app.use(bodyParser.json() )
app.use(bodyParser.urlencoded({extended:true}))

//跨域
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
app.get("/default",function(req,res){
    let data={
        name:"bricks",
        age:26
    }
    res.status(200)
    res.json(data)
})
app.post("/user",function(req,res){
    console.log(req.stack);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
    let data={
        name:"bricks",
        age:26
    }
    res.json(data)
})
var server = app.listen(6060, function () {
    var host = server.address().address;
    var port = server.address().port;
})