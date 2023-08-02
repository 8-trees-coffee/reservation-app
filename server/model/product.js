const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
//   author: ObjectId,
  coverImage: String,
  name: {type: String, required: true, max:[60, '最大60文字までです']},
  price: Number,
  description: String,
  hedding1: String,
  hedding2: String,
  hedding3: String,
  heddingtext1: String,
  heddingtext2: String,
  heddingtext3: String,
 
});

module.exports = mongoose.model('Product', ProductSchema)
