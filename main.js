#!/usr/bin/env node                   
//shebang syntax for node

let inputArray = process.argv.slice(2);
// const { log } = require("console");
let fs = require("fs")
let path = require("path")
let helpObj = require("./commands/help")
let treeObj = require("./commands/tree")
let organizeObj = require("./commands/organize")
// console.log(inputArray);

// node main.js tree "directoryPath" 
// node main.js organize "directoryPath" 
// node main.js help 

let command = inputArray[0];
let types = {
    media: ["mp4", "mkv","png"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf','csv', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
switch(command){
    case "tree":
        treeObj.treeKey(inputArray[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArray[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please Input Right command");
        break;
    }
    
     

