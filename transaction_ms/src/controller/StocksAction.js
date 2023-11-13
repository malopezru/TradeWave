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
    try {
        const user = await getUser(authorization);
        const stocksByUser = await StocksActionModel.find({ userId: user.id, action: 'buy' });
        console.log(stocksByUser)
        res.status(200).jsonp(stocksByUser);
    } catch (error) {
        res.status(500).jsonp({ error: error.message })
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
Stock.prototype.buyOrSellStock = async function (req, res) {
    const { stock } = req.params;
    const { action } = req.query;
    const { authorization } = req.headers;
    try {
        const userData = await getUser(authorization);
        if (action == 'sell') {
            await StocksActionModel.deleteOne({ stock, userId: userData.id, action: 'buy' })
        };
        const actions = await StocksActionModel.find({});
        //const stockValue = await getStockValue(stock);
        console.log(actions)
        let id = 0;
        if (actions.length != 0) {
            id = actions[actions.length-1]._id + 1;
        }
        const newAction = new StocksActionModel({
            _id: id,
            userId: userData.id,
            stock,
            createdAt: new Date(),
            currentValue: 100,
            action
        });
        const stocks = await newAction.save();
        res.status(200).jsonp(stocks);
    } catch (error) {
        console.log(error.message);
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
            url: 'http://user-auth-app:4000/users/getMe',
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
async function getStockValue(stock) {
    try {
        const stockValue = await axios({
            method: "GET",
            url: `http://prediction-app:7651/stock_price/?symbol=${stock}`
        });
        return stockValue.data;
    } catch (error) {
        throw new Error(error);
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = Stock;
