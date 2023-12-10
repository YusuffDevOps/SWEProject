const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const app = express();
const connectDB = require("./config/db");
const port = 3000; //Server Port Number
const {
  uploadedImage,
  galleryImage
} = require("./models/imageModel"); //Import image DB models
const Admin = require("./models/admin"); //Import Admin DB model
const login = require("./controllers/auth"); // Import login controller
const adminAuth = require("./middleware/Auth");

//Set server engine to ejs(Allow server to render ejs files)
app.set("view engine", "ejs");
//Allow static files from public folder
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());//Use cookieparser 
app.use(express.urlencoded({
  extended: true
}));
//Allow server access from anywhere
app.use(cors({
  origin: '*'
}));

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yusuffkazeem63@gmail.com',
    pass: 'kzck tqzo futj oqbn'
  }
});

connectDB();

//Setup multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

/*
Get route sends accepted images
*/
app.get("/", async (req, res) => {
  try {
    const images = await galleryImage.find({});
    res.render("conservation", {
      items: images
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/upload", (req, res) => {
  res.render("newSpecies")
})

/*
Post route adds new uploaded image to DB
*/
app.post("/upload", upload.single("image-file"), async (req, res) => {
  const obj = {
    title: req.body.title,
    userEmail: req.body.email,
    desc: req.body.desc,
    category:req.body.category,
    imageType: req.file.mimetype,
    image: req.file.buffer
  }
  try {
    await uploadedImage.create(obj);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

//Get Admin Login Page
app.get("/admin/login", (req, res) => {
  res.render("login", {
    errorMessage: ""
  });
});

/*
POST for Admin Login route uses login controller imported from auth.js
*/
app.post("/admin/login", login);

app.get("/admin/images", adminAuth, async (req, res) => {
  try {
    const images = await galleryImage.find({});
    res.render("AdminControl", {
      items: images
    });
  } catch (err) {
    console.log(err);
  }
})

app.get("/admin", adminAuth, async (req, res) => {
  const oldestImage = await uploadedImage.find({}).sort({
    "date_time": 1
  }).limit(1);
  const size = await uploadedImage.find({}).countDocuments();
  res.render("admin", {
    items: oldestImage,
    numImages: size
  });
});

/**
 * 
 */
app.post("/delete/:imageId", async (req, res)=>{
  try{
  await galleryImage.deleteOne({
    _id:req.params.imageId
  })
  res.redirect("/")
  }catch(err){
    console.log(err)
  }
})


/*
Log admin out of the route
*/
app.get("/logout", (req, res) => {
  res.cookie("jwt", "", {
    maxAge: "1"
  })
  res.redirect("/")
});

app.get("/edit/image/:imageId", async(req, res)=>{
  const image = await galleryImage.findOne({
    _id:req.params.imageId
  })
  res.render("editImage",{
    image:image
  })
});

app.post("/edit/image/:imageId", async(req, res)=>{
  const image = await galleryImage.findOne({
    _id:req.params.imageId
  })
  image.title = req.body.title
  image.desc = req.body.desc,
  image.category = req.body.category
  await image.save();
  res.redirect("/admin/images");
});
/**
 * 
 */
app.get("/accept/:imageId", async (req, res) => {
  const acceptedImage = await uploadedImage.findOne({
    _id: req.params.imageId
  })
  try {
    const obj = {
      title: acceptedImage.title,
      userEmail: acceptedImage.userEmail,
      desc: acceptedImage.desc,
      category:acceptedImage.category,
      imageType: acceptedImage.imageType,
      image: acceptedImage.image,
      date_time: acceptedImage.date_time
    }
    await galleryImage.create(obj); //Add accepted image to gallery
    await uploadedImage.deleteOne({
      _id: req.params.imageId
    }); //Delete Image from queue
    //Alert client that it was accepted
    var mailOptions = {
      from: 'yusuffkazeem63@gmail.com',
      to: obj.userEmail,
      subject: 'Accepted Image to Gallery',
      text: 'Hi,\n Your image submitted to our website has been accepted by the Web administrator\n You can view it using the link below: \n http://localhost:3000\n\n Kind regards,\nWeb Administrator'
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.redirect("/admin")
  } catch (err) {
    console.log(err)
  }
});

app.get
app.get("/reject/:imageId", async (req, res) => {
  try {
    await uploadedImage.deleteOne({
      _id: req.params.imageId
    }); //Delete Image from queue
    //Alert client that it was rejected
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
})


app.listen(port, () => {
  console.log("Listening on port" + port);
});

app.on('error', console.error);