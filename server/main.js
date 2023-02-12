const writeOp= require('./file');

writeOp('new.ts','hello i am typescript') // new.ts -> type script file
    .then(function(data){
        console.log('success in promise: ',data);
    })
    .catch(function(err){
        console.log('failure: ',err);
    })