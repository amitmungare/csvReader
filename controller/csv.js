const multer = require("multer");
const path = require('path')
const csv = require('csv-parser')
const fs = require('fs')
const uploadCsv=[]


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'../','/uploads'));
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null, file.originalname+'-'+uniqueSuffix);
    }
})

function fileFilter(req, file, cb){
    if(file.mimetype =='text/csv'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage:storage, 
    fileFilter:fileFilter
}).single('uploaded_file')

module.exports.upload = function(req, res){
    upload(req,res, function(err){
        if(err instanceof multer.MulterError){
            return;
        }else if(err){
            return;
        }else if(req.file){
            uploadCsv.push(req.file.filename)
        }
        return res.redirect('back')
    })
}


module.exports.uploadCsv=function(){
    return uploadCsv;
}

module.exports.open=function(req,res){
    const csvData=[];
    const i=req.query.index;
    fs.createReadStream(path.join(__dirname,'../','/uploads', uploadCsv[i]))
    .pipe(csv())
    .on('data', (data)=>csvData.push(data))
    .on('end', ()=>{
        return res.render('csv', {
            csvData:csvData
        })
    })
}

module.exports.delete = function(req,res){
    let i = req.query.index
    try{
        var files = fs.readdirSync(path.join(__dirname,'../','/uploads'))
    }catch(error){
        return
    }
    if(files.length>0){
        var filePath = path.join(__dirname,'../','/uploads', uploadCsv[i])
        if(fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath)
    }
    uploadCsv.splice(i,1)
    return res.redirect('back')
}