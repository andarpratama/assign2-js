const jwt = require('jsonwebtoken')
const userModel = require('../models/Users')

class authJwt {
   static authentication(req, res, next) {
      const {access_token} = req.headers
      if (!access_token) {
         // return res.status(401).json({msg: 'Missing access token..', success: false})
         throw ({name: 'Missing_Token'})
      }
      
      jwt.verify(access_token, process.env.SECRET_KEY, (err, decoded) => {
         if (err) {
            throw ({name: 'Invalid_Token'})
         }
         // id dari token dan dimasukan kedalam req
         req.userID = decoded.id 
         next()
      })
   }

   static authorization(req, res, next) {
      userModel.findById(req.userID)
         .then((result) => {
            if (result.id !== req.userID) {
               res.status(403).json({success: false, msg: `Forbidden access`})
            } else {
               next()
            }
         })
   }

   static idIsValid(req, res, next) {
      if (!req.userID) {
         res.status(403).json({success: false, msg: `req.userID is not undefined`})
      }
      next()
   }

}

module.exports = authJwt