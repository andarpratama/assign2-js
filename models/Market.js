const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.set('useFindAndModify', false);

const marketSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   earn: {
      type: Number,
      required: true,
      default: 0
   },
   users: {type: mongoose.Types.ObjectId, ref: 'Users'}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Market = mongoose.model('Market', marketSchema)
module.exports = Market

