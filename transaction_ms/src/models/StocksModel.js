var mongoose = require('mongoose'),
    Schema = mongoose.Schema 

var StocksModel = new Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
})

module.exports = mongoose.model('stock', StocksModel);