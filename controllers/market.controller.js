const marketModel = require('../models/Market')
const userModel = require('../models/Users')

class Market {
  static getAll(req, res) {
     userModel.findById(req.userID)
      .populate('markets')
      .then((result) => {
         const marketId = result.resource.markets
         marketModel.find({
            '_id': { $in: marketId }
         }, function(err, ListOfMarket) {
            res.status(200).json({ msg: 'Success find all markets', onwerName: result.name, onwerID: result.id, totalMarket: ListOfMarket.length , ListOfMarket });
         });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Failed find all markets' });
      });
  }
   

  static getOne(req, res) {
    const { id } = req.params;
    marketModel.findById(id)
      .then((result) => {
        res.status(201).json({ msg: `Success find market with id : ${id}`, data: result });
      })
      .catch((err) => {
        res.staus(500).json({ msg: `Failed find market with id : ${id}`, data: err });
      });
     
  }

  static async createMarket(req, res) {
     const { name } = req.body
     try {
        const users = await userModel.findById(req.userID)
        let gold = users.resource.golds
        let food = users.resource.foods

        if (gold >= 30 && food >= 10) {
           const createMarket = await marketModel.create({ name, users: req.userID });
           const payment = await userModel.findByIdAndUpdate(users.id, {$inc: {'resource.golds': -30, 'resource.foods': -10}}, {new: true})
           const pushMarket = await userModel.findByIdAndUpdate(users.id, {$push: {'resource.markets': createMarket.id}}, {new: true})
           res.status(200).json({msg: 'Success created market..', data: createMarket})
         } else {
           res.status(500).json({msg: 'Gold or food is not enough..'})
        }
     } catch (err) {
         throw({name: 'Failed_created'})
     }
  } 

  static updateMarket(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    marketModel
      .findByIdAndUpdate(id, { name, userId }, { new: true })
      .then((result) => {
        res.status(201).json({msg: `Success updating market with id : ${id}`,data: result,});
      })
      .catch((err) => {
        res.status(500).json({ msg: `Failed updating market with id : ${id}`, data: err });
      });
  }

  static pushMarket(req, res, next) {
    const { id } = req.params;
     userModel.findById(req.userID)
      .then((foundUser) => {
         const markets = foundUser.resource.markets
         markets.forEach(market => {
            if (id == market) {
               res.status(500).json({msg: 'This id market has been pushed before..'})
               res.end()
            } else {
               userModel.findByIdAndUpdate(req.userID, { $push: { 'resource.markets': id } }, { new: true })
               .then((_)=> res.status(201).json({msg: `Success push market with id : ${id} to Resource Market`}))
               .catch((err)=> res.status(500).json({msg: `Failed push market with id : ${id} to Resource Market`, data: err }))
            }
         });
      })
  }
   
   static deleteMarketInUser(req, res) {
      userModel.findByIdAndUpdate(req.userID, { $pull: { 'resource.markets': req.params.id } }, { new: true })
      .then((_)=> res.status(201).json({msg: `Success pull market with id : ${req.params.id} to Resource Market`}))
      .catch((err)=> res.status(500).json({msg: `Failed pull market with id : ${req.params.id} to Resource Market`, data: err }))
   }

  static deleteMarket(req, res) {
     const { id } = req.params;
     userModel.findByIdAndUpdate(req.userID, { $pull: { 'resource.markets': req.params.id } }, { new: true }).then()
     marketModel.findByIdAndDelete(id)
      .then((result) => {
        res.status(201).json({ msg: `Success deleting market with id : ${id}` });
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Failed deleting market', data: err });
      });
  }

   static deleteMany(req, res) {
      const {userId} = req.body
      marketModel.deleteMany({ users: { $in: userId } })
      .then((result)=> res.json({msg: 'Success delete all market'}))
   }
   
   static collect(req, res) {
      marketModel.findById(req.params.id)
      .then((foundMarket) => {
         if (foundMarket.earn !== 0) {
            marketModel.findByIdAndUpdate(foundMarket.id, { $inc: { 'earn': - foundMarket.earn } }, { new: true })
            .then((_) => {})
         } else {
            res.status(500).json({ msg: 'Gold in market is empty' })
            res.end()
         }

         userModel.findByIdAndUpdate(req.userID, {$inc: {'resource.golds': foundMarket.earn}}, {new: true})
         .then((updatedUser)=>{
            if (updatedUser.resource.golds > 1000) {
               userModel.findByIdAndUpdate(req.userID, {'resource.golds': 1000}, {new: true})
            }
            res.status(200).json({msg: 'Success collect the market..', incrementGold: `+ ${foundMarket.earn}`, dataGolds: updatedUser.resource.golds, dataFoods: updatedUser.resource.foods})
         })
         .catch((err)=> res.status(500).json({msg: 'Failed collect the market..', data: err}))
      })
      .catch((err)=> res.status(500).json({msg: 'Failed collect the market..'}))
      
  }

   
}
module.exports = Market