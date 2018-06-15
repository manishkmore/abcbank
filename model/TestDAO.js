var cust = require('./CustomerDAO.js');

//cust.createCust("12357","abcd","bihar","saving");

var detail=cust.getCustDetail("bihar");
console.log('Callled##################################');
console.log("result"+detail);