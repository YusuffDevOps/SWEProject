const jwt = require('jsonwebtoken');
const jwtSecret = '9291dc03c7c1ce613516d326c134cf120e62523c77e96d2f627c5a7fd1045b5f00f979';
const cookieParser = require("cookieparser");
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const adminAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.redirect("/admin/login"); //User is not authenticated redirect to login page
        } else {
            next() // Allow admin access
        }
      })
    } else {
      return  res.redirect("/admin/login"); //User is not authenticated redirect to login page
    }
  }

module.exports = adminAuth;