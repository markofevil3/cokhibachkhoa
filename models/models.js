var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var productSchema = new Schema({
  orderNum: Number,
  name: String,
  inputDate: Date,
  type: Number,
  details: {}
  // imageUrls: [String]
});

module.exports = {
  'Product': mongoose.model('Product', productSchema)
};
