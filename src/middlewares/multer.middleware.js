import multer from "multer";

//this below is completely copied code from multer github repo, modified to our needs
const storage = multer.diskStorage({//disk storage is used to store files on disk, there are other functions like memory storage
    destination: function (req, file, cb) {//provide destination where file will be stored
      //reqeest contains bodu json data and handled by body parser, multer or express
      cb(null, "./public/temp")//cb means callback, null is error, "./public/temp" is the path where file will be stored
    },
    filename: function (req, file, cb) {//req is from the user, file is the file that is uploaded, cb is callback
      //file name caan be generated here, look in github ,multer repo
      //people can have same named files(that might overwrite), thus we can random twik the originalname to unique name
      cb(null, file.originalname)//null is error, file.originalname is the name of the file
      

    }
  }) 
export const upload = multer({ 
    // storage: storage,
    // or
    storage,
})