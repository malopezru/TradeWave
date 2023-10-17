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
        //await producer.sendToken(authorization);
        const user = await getUser(authorization);
        const stocks = await StocksActionModel.find({ userId: user.id });
        res.status(200).jsonp(stocks);
    } catch (error) {
        res.status(500).jsonp({ error: error.message })
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
Stock.prototype.buyOrSellStock = async function (req, res) {
    const { stockId } = req.params;
    const { action } = req.query;
    const { authorization } = req.headers;
    try {
        const userData = await getUser(authorization);
        const actions = await StocksActionModel.find({});
        const newAction = new StocksActionModel({
            _id: actions.length + 1,
            userId: userData.id,
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
async function getUser(token) {
    try {
        const user = await axios({
            method: "POST",
            url: 'http://user_auth_app:4000/users/getMe',
            headers: {
                authorization: token
            }
        });
        return user.data;
    } catch (error) {
        throw new Error(error);
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = Stock;
