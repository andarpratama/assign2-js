const barrackModel = require('../models/Barrack')
const userModel = require('../models/Users')

class Barrack {
   static getAll(req, res) {
     userModel.findById(req.userID)
      .populate('farms')
      .then((result) => {
         const barrackId = result.resource.barracks
         barrackModel.find({
            '_id': { $in: barrackId }
         }, function(err, ListOfBarracks) {
            res.status(200).json({ msg: 'Success find all barracks', onwerName: result.name, onwerID: result.id , ListOfBarracks });
         });
      })
      .catch((err) => {
        throw ({name: 'Failed_get_all'})
      });
  }

   static getOne(req, res) {
      barrackModel.findById(req.params.id)
         .then((result) => {
            res.status(201).json({msg: `Success get market with id : ${req.params.id}`, data: result})
         })
         .catch((err) => {
            throw ({name: 'Failed_get_detail'})
         })
   }

   static async createBarrack(req, res) {
     const { name } = req.body
     try {
        const users = await userModel.findById(req.userID)
        let gold = users.resource.golds
        let food = users.resource.foods
        let totalBarrack = users.resource.barracks
        if (totalBarrack.length > 30) {
           res.status(500).json({msg: 'Total barrack is has 20, cant build barrack again..'})
           res.end()
        } else if (gold >= 30 && food >= 30) {
           const createMarket = await barrackModel.create({ name, users: req.userID });
           const payment = await userModel.findByIdAndUpdate(users.id, {$inc: {'resource.golds': -30, 'resource.foods': -30}}, {new: true})
           const pushMarket = await userModel.findByIdAndUpdate(users.id, {$push: {'resource.barracks': createMarket.id}}, {new: true})
           res.status(200).json({msg: 'Success created barrack..', data: createMarket})
         } else {
           res.status(500).json({msg: 'Gold or food is not enough..'})
        }
     } catch (err) {
         throw({name: 'Failed_created'})
     }
  } 

   static updateBarrack(req, res) {
      const {name} = req.body
      barrackModel.findByIdAndUpdate(req.params.id, { name }, { new: true })
         .then((result) => {
            res.status(201).json({msg: `Success update barrack with id : ${req.params.id}`, data: result})
         })
         .catch((err) => {
            throw({name: 'Failed_updated'})
         })
   }

   static deleteBarrack(req, res) {
     const { id } = req.params;
     userModel.findByIdAndUpdate(req.userID, { $pull: { 'resource.barracks': req.params.id } }, { new: true }).then()
     barrackModel.findByIdAndDelete(id)
      .then((result) => {
        res.status(201).json({ msg: `Success deleting barrack with id : ${id}` });
      })
      .catch((err) => {
        throw({name: 'Failed_deleted'})
      });
  }

   static collect(req, res) {
      barrackModel.findById(req.params.id)
      .then((foundBarrack) => {
         if (foundBarrack.earn !== 0) {
            barrackModel.findByIdAndUpdate(foundBarrack.id, { $inc: { 'earn': - foundBarrack.earn } }, { new: true })
            .then((_) => {})
         } else {
             res.status(500).json({msg: 'Soldier in barrack is empty'})
         }

         userModel.findByIdAndUpdate(req.userID, {$inc: {'resource.soldiers': foundBarrack.earn}}, {new: true})
         .then((updatedUser)=>{
            if (updatedUser.resource.soldiers > 1000) {
               userModel.findByIdAndUpdate(req.userID, {'resource.soldiers': 1000}, {new: true})
            }
            res.status(200).json({msg: 'Success collect the market..', data: updatedUser})
         })
         .catch((err)=> res.status(500).json({msg: 'Failed collect the market..', data: err}))
      })
      .catch((err)=> res.status(500).json({msg: 'Failed collect the market..'}))
      
  }
}

module.exports = Barrack