const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const jwtSecret = '9291dc03c7c1ce613516d326c134cf120e62523c77e96d2f627c5a7fd1045b5f00f979';
const Admin = require("../models/admin");

/*
login controller
Function gets username and password and authenticates it.
 */
const login = async (req, res, next) => {
    const { username, password } = req.body
    
    // Check if username and password is provided
    if (!username || !password) {
      return res.render("login", { errorMessage: "Username or Password not present"})
    }
    try {
      const admin = await Admin.findOne({ username})
      if (!admin) {
        //User not found in database 
        return res.render("login", { errorMessage: "Login not succesful please try again with valid username and password"})
      } else {
        bcrypt.compare(password, admin.password).then(function (result) {
          if (result) {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
              { id: admin._id, username:admin.username},
              jwtSecret,
              {
                expiresIn: maxAge, // 3hrs in sec
              }
            );
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            //If user succesfully logged in with valid password and username
              res.redirect("/admin");
          } else {
            //If password is incorrect 
            return res.render("login", { errorMessage: "Login not succesful please try again with valid username and password"})
          }
        })
      }
      //If error occurs during database query 
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      })
    }
  }


module.exports = login;