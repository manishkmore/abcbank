var fs = require('fs');


var getCustomerList = function(){
    var data = fs.readFileSync('./dataAccess/customerdata.json','utf8');
    var cList = JSON.parse(data);
    //var cList = [c1,c2];
    //console.log(cList);
    return cList;
};

//getCustomerList();

var aCustomer = function(cust){
    var cData = getCustomerList(); 
    console.log(cData); 
    //cust._id = cust.custId;  
    cData[cData.length]=cust;
    var myWriteSFile = fs.writeFileSync('./dataAccess/customerdata.json',JSON.stringify(cData));
    //console.log(cData);
    
};


var c3 = {
    "custId": "c3",
    "custName": "Manish",
    "branchName": "Hinjewadi",
    "accountType": "Savings"
  };

//aCustomer(c3);

module.exports.getCustomerList = getCustomerList;
module.exports.aCustomer = aCustomer;
