// import nodejs fs module

const fs = require('fs');
const { join } = require('path');

// WRITE
// writeFile -> to write something in file
// fs.writeFile('./contents/abc.js', 'welcome to node js', function (err, done) {
//     if (err) {
//         console.log("error in writing file", err)
//     } else {
//         console.log("success in writing file,", done)
//     }
// })


// Task
// Make it functional
// and export it
// and call it from another file

// making it functional
/*
function myWrite(fileName, content) {
    fs.writeFile('./contents/' + fileName, content, 
        if (err) {
            // console.log("error in writing file", err)  
        } else {
            // console.log("success in writing file,", done)
        }
    })
}
myWrite('ommani.txt','i am nodejs); 

// using callback:
function myWrite(fileName, content, cb) {
    fs.writeFile('./contents/' + fileName, content, function(err, done) 
    {
        if (err) {
             // cb(err);
        } else {
            // cb(done); // yasma undefined janxa
            // cb(null, "success in write")
        }
    })
}
// result must be handled
// myWrite('ommani.txt', 'iam node js',function(err,done){
//     if(err){
//         console.log('error is: ',err)
//     }
//     else{
//         console.log('success is: ',done)
//     }
// })

*/
// using promise
function myWrite(fileName, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile('./contents/' + fileName, content, function (err, done) {
            if (err) {
                reject(err);
            } else {
                resolve('success in write');
            }
        })
    })
}
module.exports = {
    write: myWrite
}


// myWrite('ac.js', 'ommanichamlingrai')
//     .then(function (data) {
//         console.log('success in promise:', data)
//     })
//     .catch(function (err) {
//         console.log("error: ", err);
//     })






// Buffer -> fixed size memory allocation. input output operation ma buffer use hunxa because fix sized vayapaxi corrupt hune chance hudaina
// Errors Types:
/*
-> DeprecationWarning -> aile ko versin ma kaam garxa but future ko version ma kaam gardaina

-> ENOENT: File folder nai xaina/vetiyana vanne error msg(no content)
*/


// READ
// readFile -> to read file
/*
fs.readFile('./contents/ac.js','UTF-8',function(err, done){
    if(err){
        console.log('error in reading: ', err);
    }
    else{
        console.log('success in reading: ',done);
        // console.log('success in reading: ',done.toString());
    }
})
*/

// our task
// create a read function
// handle result of your function
// file-file communication


// RENAME:
// rename -> to rename file
/*
fs.rename('./contents/ommani.txt', './contents/new_ommani.txt', function (err, done) {
    if (err) {
        console.log('error in renaming: ', err)
    }
    else {
        console.log('success in renaming: ', done);
    }
})
*/
// our task
// create a rename function
// handle result of your function
// file-file communication


// REMOVE
// unlink -> to remove file
fs.unlink('./contents/ac.js', function (err, done) {
    if (err) {
        console.log('error in removing: ', err)
    }
    else {
        console.log('success in removing: ', done)
    }
})
// our task
// create a rename function
// handle result of your function
// file-file communication