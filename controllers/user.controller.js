const userModel = require ("../models/Users")
const bcrypt = require('bcrypt');

class Users {

   static getAll(req, res) {
      userModel.find()
      .then((result) => {
         res.status(201).json({msg: `Success get all users`, data: result})
      })
      .catch((err) => {
         res.status(500).json({msg: `Failed get all users`, data: err})
      })
   }

   static cekid(req, res) {
      console.log(req.userID)
      res.json({userId: req.userID})
   }

  static detail(req, res) {
      const id = req.userID
      userModel.findById(id)
      .then((result) => {
         res.status(201).json({msg: `Detail resource townhall`, data: result})
      })
      .catch((err) => {
         res.status(500).json({msg: `Cannot see detail resource townhall`, data: err})
      })
  }

  static update(req, res) {
     const id = req.params.id;
     const { name, email, password } = req.body;
     
     const updateData = { name, email, password };
     
     for (const item in updateData) {
      //   if (updateData[item] === updateData['password']) {
      //      updateData[item] = bcrypt.hashSync(updateData[item], 8);
      //   }
        if (!updateData[item]) {
           delete updateData[item]
        }
     }
     

    userModel.findByIdAndUpdate(id, updateData, { new: true })
      .then((result) => {
        res.status(200).json({ msg: 'Success update the user', data: result });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Failed update the user' });
      });
    }

   
   static delete(req, res) {
      userModel.findByIdAndDelete(req.params.id)
         .then((result) => {
            res.status(201).json({msg: `Success delete your user`})
         })
         .catch((err) => {
            res.status(500).json({msg: 'Failed delete your user'})
         })
   }
   

   static async attack(req, res) {
      const userID = req.userID
      try {
         const myUser = await userModel.findById(userID)
         const enemyUser = await userModel.findById(req.params.id)
         const mySoldierAttack = parseInt(req.body.soldier)

         const RandomAttack = (attack, defend) =>{
            const arr = [];
            for (let i = 0; i < 3; i++) {
               arr.push(Math.random() < attack / (defend + 1));
            }
            return arr.filter((el) => el).length >= 2 ? true : false;
         }
         
         let enemyGolds = enemyUser.resource.golds
         let enemyFoods = enemyUser.resource.foods
         
         // Jika soldier yang kita kirim itu lebih besar soldier yang kita punya
         if (!(mySoldierAttack > myUser.resource.soldiers)) {
            // Jika soldier musuh lebih kecil dari 50
            if (!(enemyUser.resource.soldiers <= 50)) {
               // Jika soldier yang kita kirim itu lebih besar dari soldier musuh 
               if (!(mySoldierAttack >= enemyUser.resource.soldiers)) {
                  let isAttack = RandomAttack(mySoldierAttack, enemyUser.resource.soldiers)
                  
                  if (isAttack) {
                     const youGetMedal = await userModel.findByIdAndUpdate(userID,{$inc: {
                        'resource.medal': 5,
                        'resource.soldiers': - mySoldierAttack,
                        'resource.golds': Math.floor(enemyGolds / 2),
                        'resource.foods': Math.floor(enemyFoods / 2)
                     },
                     }, { new: true })
                     
                     const enemyGetMedal = await userModel.findByIdAndUpdate(req.params.id, {$inc : {
                        'resource.medal': 2,
                     }
                     }, { new: true })
                     
                     res.status(201).json({msg: 'Congratulation you win..', before: youGetMedal, data: enemyGetMedal})
                  } else {
                     const decMedal = await userModel.findByIdAndUpdate(userID, {$inc : {
                        'resource.medal': - Math.floor(resource.medal / 2),
                     }}, {new: true})
                     
                     res.status(500).json({msg: 'Sorry you lose..', data: decMedal})
                  }

               } else {
                  res.status(500).json({ msg: 'Your soldiers greater than enemy soldier' })
               }
            } else {
               res.status(500).json({ msg: 'Cant attack, enemy soldier less than 50' })
            }
         } else {
            res.status(500).json({ msg: 'Soldier is not enough' })
         }

      } catch {
         res.status(500).json({ msg: 'Failed to attack enemy'})
      }
   }
}

module.exports = Users;
