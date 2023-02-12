var bikes=['honda','yamaha'];
var cars=['tesla','audi'];
var languages=['js','php'];

//file-file communication
// one file must export
// one file must import

//export syntax (es5)
// for single export
// module.exports=bikes;
// for multiple exports
module.exports={
    a: bikes,
    b: cars,
    c: languages
}

// es6 export syntax
// export 
// export default
