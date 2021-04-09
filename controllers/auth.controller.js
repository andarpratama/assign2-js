const userModel = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Auth {
   static async register(req, res, next) {

      const name = req.body.name
      const email = req.body.email
      const password = req.body.password

      try {
         if (name && email && password) {
            const newUser = await userModel.create({
               name: name,
               email: email,
               password: bcrypt.hashSync(password, 8),
            })
            res.status(201).json({data: newUser})
         } else {
            res.status(500).json({msg: 'Please input name, email and password'})
         }
      } catch {
         res.status(500).json({data: 'Error'})
      }
      
  }

  static login(req, res) {
    userModel.findOne({ email: req.body.email })
      .then((result) => {
        if (!result) {
          return res.status(401).json({success: false,msg: 'Users with this email and password is wrong',});
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password,result.password);
        if (!passwordIsValid) {
          return res.status(401).json({success: false,msg: 'Users with this email and password is wrong',});
        }

        let token = jwt.sign({ id: result.id }, process.env.SECRET_KEY, {
          expiresIn: '1hr',
        });
        res.status(200).json({ msg: 'Success login', data: result, accessToken: token });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Failed login', data: err });
      });
  }
   
   static logout(req, res) {
      const {access_token} = req.headers
      jwt.destroy(access_token)
      res.json({msg: 'Logout..'})
   }
}


module.exports = Auth