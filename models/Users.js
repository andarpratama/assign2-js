const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const usersSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   resource: {
      golds: {
         type: Number,
         minLength: 0,
         maxLength: 1000,
         default: 100
      },
      foods: {
         type: Number,
         minLength: 0,
         maxLength: 1000,
         default:100
      },
      soldiers: {
         type: Number,
         minLength: 0,
         maxLength: 500,
         default:0
      },
      medal: {
         type: Number,
         default: 0
      },
      markets: [{
         type: mongoose.Types.ObjectId, ref: 'Market'
      }],
      farms: [{
         type: mongoose.Types.ObjectId, ref: 'Farm'
      }],
      barracks: [{
         type: mongoose.Types.ObjectId, ref: 'Barrack'
      }]
   }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } })

const Users = mongoose.model('Users', usersSchema)
module.exports = Users
