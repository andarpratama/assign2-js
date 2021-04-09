const farmModel = require('../models/Farm')

class Farm {
   static getAll(req, res) {
      farmModel.find()
         .then((result) => {
            res.status(201).json({msg: 'Success find all farms', data: result})
         })
         .catch((err) => {
            throw ({name: 'Failed_get_all'})
         })
   }

   static getOne(req, res) {
      const { id } = req.params
      farmModel.findById(id)
         .then((result) => {
            res.status(201).json({msg: `Success find farm with id : ${id}`, data: result})
         })
         .catch((err) => {
            throw ({name: 'Failed_get_detail'})
         })
   }

   static createFarm(req, res) {
      const {name} = req.body
      farmModel.create({name})
         .then((result) => {
            res.status(201).json({msg: 'Success creating new Farm', data: result})
         })
         .catch((err) => {
            throw({name: 'Failed_created'})
         })
   }

   static updateFarm(req, res) {
      const { id } = req.params
      const { name } = req.body
      farmModel.findByIdAndUpdate(id, {name}, {new: true})
         .then((result) => {
            res.status(201).json({msg: `Success updating farm with id : ${id}`, data: result})
         })
         .catch((err) => {
            throw({name: 'Failed_updated'})
         })
   }

   static deleteFarm(req, res) {
      const { id } = req.params
      farmModel.findByIdAndDelete(id)
         .then((result) => {
            res.status(201).json({msg: `Success deleting farm with id : ${id}`})
         })
         .catch((err) => {
            throw({name: 'Failed_deleted'})
         })
   }
}

module.exports = Farm