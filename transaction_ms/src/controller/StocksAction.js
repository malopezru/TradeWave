const StocksActionModel = require('../models/StocksActionModel');
const StocksModel = require('../models/StocksModel');
const axios = require('axios');
const Producer = require('./producer');
const Subscriber = require('./subscriber');
const symbols = require('./symbols');
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
    const ids = [];
    try {
        const user = await getUser(authorization);
        const stocksByUser = await StocksActionModel.find({ userId: user.id });
        for (const stock of stocksByUser) {
            ids.push(stock.stockId);
        }
        const stocks = await StocksModel.find({ _id: { $in: ids }})
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
Stock.prototype.getSymbolsData = async function (req, res) {
    const symbolsData = [];
    let id = 0;
    
    for (const symbol of symbols) {
        const endpoint = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;
        const response = await axios({
            url: endpoint,
            method: "GET"
        })
    
        const data = response.data.chart.result[0].indicators.quote[0];
        if (data && response.status === 200) {
            const symbolValue = data['open'][data['open'].length - 1];
            symbolsData.push({
                _id: id,
                name: symbol,
                value: symbolValue.toFixed(4)
            });
            id++;
        } else {
            throw new Error('Error getting symbols');
        }
    }
    res.status(200).jsonp(symbolsData);
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
async function getUser(token) {
    try {
        const user = await axios({
            method: "POST",
            url: 'http://localhost:4000/users/getMe',
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
