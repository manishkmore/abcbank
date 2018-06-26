var AssistantV1 = require('watson-developer-cloud/assistant/v1');
var readline = require('readline-sync');

// Set up Assistant service wrapper.
module.exports.callAssistant = function(){

        var service = new AssistantV1({
        username: 'cd10e860-f310-4f46-8346-2502b81d7da0', // replace with service username
        password: 'AewUIgmfUPjk', // replace with service password
        version: '2017-05-26'
        });

        var workspace_id = '61de4326-44ca-4799-a7e2-66f074e9927d'; // replace with workspace ID

        // Start conversation with empty message.
        console.log('calling assistant service..');
        service.message({
        workspace_id: workspace_id
        }, processResponse);

        // Process the service response.
        function processResponse(err, response) {
            if (err) {
                console.error(err); // something went wrong
                return;
            }

            // Display the output from dialog, if any.
            console.log('received response deom service');
            if (response.output.text.length != 0) {
                console.log(response);
            }
            
            var question = readline.question('next question: ');
            readline.prompt;
            console.log('question asked: '+question);
            if(question ==='exit')     return "exit";

            service.message({
                workspace_id : workspace_id,
                input : {text : question },
                action : 'dummy_action',
                context : response.context
            }, processResponse);


        }

};

