var http = require('http');
var fs = require('fs');
var url = require('url');
var customerDB = require('../model/CustomerDAO');
//var customerDB = require('../dataAccess/dummyGetList'); // dummy function
var express = require('express');
var controller = express();
controller.set('view engine','ejs');
var bodyParser = require('body-parser');
var callAssistant = require('../watson/assistant');

// used to create urlEncoding object used to parse html and create req.body object
var urlencodedParser = bodyParser.urlencoded({extended: false});

var readline = require('readline-sync');

//while(true){
//    var name = readline.question('what is your next question?')
//    readline.prompt;
        //if (i === 'right') readline.close();
        var name = callAssistant.callAssistant();
        //console.log(name);
//        if(name === 'exit')  {break;}
//}

// Used to get Customer List using branchName using default route
controller.get('/',function(req,res){
    
    var reqData = url.parse(req.url,true,true);
    //console.log(reqData);
    customerDB.getCustDetail(reqData.query.branchName, function(err, cList){
        console.log("customer List: "+cList);
        res.render('index',{data: "test", cList :cList});
    
    });    

});

// Used to get Customer List using branchName using /getCustomerList route
controller.get('/getCustomerList',function(req,res){
    res.writeHead(200, {'Content-Type':'text/html'});
    var reqData = url.parse(req.url,true,true);
    //var cList = customerDB.getCustomerList();
    var cList = customerDB.getCustDetail("hin");
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

// Call add customer model layer
controller.post('/aCustomer',urlencodedParser, function(req,res){
    var Clist = customerDB.createCust(req.body.custId,req.body.custName,req.body.branchName,req.body.accountType);

    //res.end(JSON.stringify(customerDB.getCustomerList()));
    res.render('addCustomer',{cList :req.query});

});


controller.get('/uCustomer',function(req,res){
    console.log(req.body);
    res.render('updateCustomer',{cList :req.query});

});


// Call update customer model layer
controller.post('/uCustomer',urlencodedParser, function(req,res){
    var Clist = customerDB.updateCustDetail(req.body.custId,req.body.custName,req.body.branchName);

    //res.end(JSON.stringify(customerDB.getCustomerList()));
    res.render('updateCustomer',{cList :req.query});

});



controller.get('/dCustomer',function(req,res){
    console.log(req.body);
    res.render('deleteCustomer',{cList :req.query});

});


// Call Delete customer model layer
controller.post('/dCustomer',urlencodedParser, function(req,res){

    var Clist = customerDB.deleteCustDetail(req.body.custId);

    //res.end(JSON.stringify(customerDB.getCustomerList()));
    res.render('deleteCustomer',{cList :req.query});

});

/*
controller.listen(8080,function(){
console.log('listening on port 8080');
});
*/