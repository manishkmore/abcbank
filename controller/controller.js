var http = require('http');
var fs = require('fs');
var url = require('url');
var customerDB = require('../dataAccess/dummyGetList');
var express = require('express');
var controller = express();
controller.set('view engine','ejs');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

//var server = http.createServer(function(req,res){
    //console.log('request was made :'+ req.url);

    //console.log(readHTML.readStream());
controller.get('/',function(req,res){
    //res.writeHead(200, {'Content-Type':'text/html'});
    var reqData = url.parse(req.url,true,true);
    var cList = customerDB.getCustomerList();    
    console.log("customer List: "+cList);
    res.render('index',{data: "test", cList :cList});

    var newObj = {
        firstName:`${reqData.query.firstName}`,
        lastName:`${reqData.query.lastName}`
    };

    //res.end(JSON.stringify(newObj));
    //readHTML.readStream(res);
});
//});

controller.get('/getCustomerList',function(req,res){
    res.writeHead(200, {'Content-Type':'text/html'});
    var reqData = url.parse(req.url,true,true);
    var cList = customerDB.getCustomerList();
    console.log("customer List: "+cList);
    //res.end(JSON.stringify(cList));\
    res.render('index',{data: "test", cList :cList});

    var newObj = {
        firstName:`${reqData.query.firstName}`,
        lastName:`${reqData.query.lastName}`
    };

    //res.end(JSON.stringify(newObj));
    //readHTML.readStream(res);
});


controller.get('/aCustomer',function(req,res){

    console.log(req.body);
    res.render('addCustomer',{cList :req.query});

});



controller.post('/aCustomer',urlencodedParser, function(req,res){
    //res.writeHead(200, {'Content-Type':'text/html'});
    //var reqData = url.parse(req.url,true,true);
    console.log(req.body);
    var cList = customerDB.aCustomer(req.body);
    //console.log("customer List: "+cList);
    //res.end(JSON.stringify(cList));
    //console.log(req.data);

    //res.end(JSON.stringify(customerDB.getCustomerList()));
    res.render('addCustomer',{cList :req.query});

    //res.end(JSON.stringify(newObj));
    //readHTML.readStream(res);
});




controller.listen(8080,function(){
console.log('listening on port 8080');
});
