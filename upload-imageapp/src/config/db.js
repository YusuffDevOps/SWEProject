const mongoose = require("mongoose");
MONGO_URI= "mongodb+srv://YusuffKazeem:Ajibola15.@cluster0.zaj3lap.mongodb.net/woodlandDB?retryWrites=true&w=majority"

const connectDB = () =>{
    mongoose.connect(MONGO_URI);
}
module.exports = connectDB;