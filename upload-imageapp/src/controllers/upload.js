const multer = require("multer");
const {uploadedImage} = require("./models/imageModel");
const storage = multer.memoryStorage();
const upload = multer({storage:storage});