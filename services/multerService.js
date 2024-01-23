const multer=require("multer");
const path =require("path");


// diskStorage
const storage = multer.diskStorage({
    // cb is a general function, it's called call back
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    // 1660889102382-97732441.png
    const uniqueName = `${Date.now()} - ${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
  
        cb(null,uniqueName);
  },
  });
  
  const MulterService = multer({
    storage:storage,
    limits: { fileSize: 1000000*5}
  }).single("image");

  module.exports=MulterService