import path from "path";

import multer from "multer";

const storage = multer.diskStorage({
  url: process.env.MONGODB_URI,
  options: {useNewUrlParser: true, useUnifiedTopology: true},
  file: (req, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.mimetype) === -1){
      const filename = `${Date.now()}-any-name-${file.originalName}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-any-name-${file.originalName}`
    }
  }
})

export default multer({storage});

/* export const uploadFile = multer({
  storage: storage,
  fileFilter: function(req, file, callback){
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg"){
      callback(null, true)
    }
    else{
      console.log("Only JPG and PNG Files are allowed!");
      callback(null, false)
    }
  }
}) */