const multer=require('multer')

const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null,'upload')
        },
        filename:function(req,file,cb)
        {
            cb(null,file.fieldname+"_"+Date.now()+".jpg")   
        }
    })
}).array("Image",10)
module.exports=upload