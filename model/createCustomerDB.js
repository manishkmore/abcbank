var MongoClient  = require('mongodb').MongoClient;;

var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, customerdb) {
  if (err) throw err;
  var dbo = customerdb.db("custDb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    customerdb.close();
  });
});