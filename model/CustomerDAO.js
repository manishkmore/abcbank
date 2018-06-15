var MongoClient  = require('mongodb').MongoClient;;

var url = "mongodb://localhost:27017/mydb";
var userDetails;
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


 function initialize (branchName) {
    var custdetails;

    return new Promise(function(resolve, reject) {
      // Do async job
      console.log('inside promise');
      MongoClient.connect(url, function(err, customerdb) {
        if (err) throw err;
        var dbo = customerdb.db("custDb");
        var query = { BranchName: branchName };
         //console.log("query"+query);
       
        dbo.collection("customers").find(query).toArray(function(err, result) {
          if (err) { console.log("rejected"); 
          reject(err);
        } else {
          //console.log(result);
          resolve(result);
      }
         
          customerdb.close();
          
              
        });
       
      });
      //console.log(detail);
       
    })


}


module.exports.getCustDetail = function (branchName) {
  console.log("inside getcust");
  var initializePromise = initialize(branchName);
  initializePromise.then(function(result) {
      userDetails = result;
      console.log("Initialized user details");
     // console.log(userDetails);
      return userDetails;
  }, function(err) {
      console.log(err);
  })
  
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

 