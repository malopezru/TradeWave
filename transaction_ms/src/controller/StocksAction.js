const StocksActionModel = require('../models/StocksActionModel');
const axios = require('axios');
const Producer = require('./producer');
const Subscriber = require('./subscriber');
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
const producer = new Producer();
const subscriber = new Subscriber();
var Stock = function (conf) {
    this.conf = conf;
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
Stock.prototype.getAllStockActions = async function (req, res) {
    try {
        const stocks = await StocksActionModel.find({});
        res.status(200).jsonp(stocks);
    } catch (error) {
        res.status(500).jsonp({ error: error.message })
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
Stock.prototype.getStocksActionsByUser = async function (req, res) {
    const { authorization } = req.headers;
    try {
        await producer.sendToken(authorization);
        const user = await subscriber.getUser();
        const stocks = await StocksActionModel.find({ userId: userData._id });
        res.status(200).jsonp(stocks);
    } catch (error) {
        res.status(500).jsonp({ error: error.message })
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
Stock.prototype.buyOrSellStock = async function (req, res) {
    const { stockId } = req.params;
    const { action, user, password } = req.query;
    try {
        const userData = await getUser(user, password);
        const actions = await StocksActionModel.find({});
        const newAction = new StocksActionModel({
            _id: actions.length + 1,
            userId: userData._id,
            stockId,
            createdAt: new Date(),
            currentValue: 100,
            action
        });
        const stocks = await newAction.save();
        res.status(200).jsonp(stocks);
    } catch (error) {
        res.status(500).jsonp({ error: error.message })
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
async function getUser(email, password) {
    try {
        const user = await axios({
            method: "POST",
            url: 'http://localhost:4001/api/user/login',
            data: {
                user: email,
                password: password
            }
        });
        return user.data;
    } catch (error) {
        throw new Error(error);
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = Stock;
