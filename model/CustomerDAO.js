var MongoClient  = require('mongodb').MongoClient;;

var url = "mongodb://localhost:27017/mydb";
var detail;
module.exports.createCust = function (custID, custName,branch,acctype) {
  MongoClient.connect(url, function(err, customerdb) {
    if (err) throw err;
    var dbo = customerdb.db("custDb");
    var myobj = { CustomerID: custID, customerName: custName ,BranchName:branch,Accounttype:acctype};
    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      customerdb.close(); 
      return ;
    });
  });
  
}


module.exports.getCustDetail = function (branchName) {
    var custdetails;
MongoClient.connect(url, function(err, customerdb) {
  if (err) throw err;
  var dbo = customerdb.db("custDb");
  var query = { BranchName: branchName };
  var detail ="";
  //console.log(dbo.collection("customers").find(query).query);
 
  var array=dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    customerdb.close();
    //console.log(result);
    detail=result;
    console.log(detail);
    return result;
        
  });
 console.log(array);
 //custdetails=detail;
 
  //return detail;
});
//console.log(detail);
}

module.exports.updateCustDetail = function (custID,custName,brnchName) {
MongoClient.connect(url, function(err, customerdb) {
  if (err) throw err;
  var dbo = customerdb.db("custDb");
  var myquery = { CustomerID: custID };
  var newvalues = { $set: {customerName: custName, BranchName: brnchName } };
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    customerdb.close();
  });
});
}

module.exports.deleteCustDetail = function (custID) {

MongoClient.connect(url, function(err, customerdb) {
  if (err) throw err;
  var dbo = customerdb.db("custDb");
  var myquery = { CustomerID: custID };
  dbo.collection("customers").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    customerdb.close();
  });
});   
}

 function Test(branchName) {
  return "world";
 }
console.log(Test("bihar"));