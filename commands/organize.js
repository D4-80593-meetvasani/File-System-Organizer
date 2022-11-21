let fs = require("fs")
let path = require("path")
function organizeFn(dirPath){
    // console.log("Organize command implemented for ",dirPath);
    // 1. input -> directory path given
    let destinationPath;
    if(dirPath==undefined){
        destinationPath = process.cwd(); 
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            // 2. create -> oraganized files -> directory
            destinationPath = path.join(dirPath,"organized_files")
            if(fs.existsSync(destinationPath)==false){
                fs.mkdirSync(destinationPath)
            }
        }else{
            console.log("Kindly enter correct path !");
            return;
        }
    }

    organizeHelper(dirPath,destinationPath)    
    
}
function organizeHelper(src,dest){
    // 3. identify categories of all files present in that directory

    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    
    for(let i=0;i<childNames.length;i++){
        let childAddress = path.join(src,childNames[i])
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i], " belongs to --> ",category);
            
            // 4. copy / cut files to that organized directory inside of any of category folder
            sendFiles(childAddress,dest,category);
        }
    }
    
}
function getCategory(name){
    let ext = path.extname(name)
    ext = ext.slice(1);
    // console.log(ext);

    for(var type in types){
        let currTypeArray = types[type];
        // console.log(currTypeArray);
        for(let i=0;i<currTypeArray.length;i++){
            if(ext== currTypeArray[i]){
                // console.log(currTypeArray[i]);
                return type;
            }
        }
    }
    return "others";
}
function sendFiles(srcFilePath,dest,category){

    let categoryPath = path.join(dest,category);

    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }

    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath,fileName)
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName," copied to --> ",category);
}

module.exports={
    organizeKey:organizeFn
}