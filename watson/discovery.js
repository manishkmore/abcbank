var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var fs = require('fs');

var username = "a6cc6267-2d0c-4c1a-be08-e1069c95f21f";
var password = "ATKbegJj1Oaf";
var version = "2017-11-07";
var environment_id = "system";
var collection_id = "news-en";

module.exports.callDiscovery = function(){

    var discovery = new DiscoveryV1({
        version: version,
        username: username,
        password: password,
        url: 'https://gateway.watsonplatform.net/discovery/api'
    });


var parameters = { 
    environment_id: environment_id, 
    collection_id: collection_id, 
    term: 'enriched_text.categories.label,count:5'
};

    discovery.query(
        
            parameters
    , function(err, response) {
            if (err)
                console.log('error:', err);
            else
                //bconsole.log(response.results[0].enriched_text);
                //fs.writeFileSync(__dirname+'/text.json',JSON.stringify(response.results[0].enriched_text));
        }
    );

};

  
this.callDiscovery();