var mongoose = require('mongoose'),
    Schema = mongoose.Schema 

var StocksActionModel = new Schema({
    _id: { type: Number, required: true },
    userId: { type: Number, required: true },
    stock: { type: String, required: true },
    createdAt: { type: Date, required: true },
    currentValue: { type: Number, required: true },
    action: {
        type: String,
        enum: [ 'buy', 'sell' ],
        required: true
    }
})


module.exports = mongoose.model('stock-actions', StocksActionModel);