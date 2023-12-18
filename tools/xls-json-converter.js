
const log = require("./log")
xlstojson = require("xls-to-json");

const convertXLS2JSON = ( file ) =>{
    xlstojson({
        input: file,  
        output: "files/pantopoleio.json", // output json 
        sheet:"παντοπωλειο",
        lowerCaseHeaders:true
    },function(err, result) {
        if(err) {
         log(err,"red")
        } else {
          log("Conversion Successfull","green")
        }
    })
};

module.exports = convertXLS2JSON