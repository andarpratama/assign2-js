const mongoose = require('mongoose')
const {Schema} = mongoose
mongoose.set('useFindAndModify', false)

const barrackSchema = new Schema({
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

const Barrack = mongoose.model('Barrack', barrackSchema);
module.exports = Barrack;