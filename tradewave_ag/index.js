const { ApolloServer } = require("apollo-server-express");
const { userTypeDefs } = require('./src/typeDefs');
const userRequests = require('./src/requests/userRequests');
const transactionRequests = require('./src/requests/transactionRequests');
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors')
const resolvers = require('./src/resolvers');

const app = express();

async function start() {
    const apolloServer = new ApolloServer({
        typeDefs: userTypeDefs,
        resolvers
    })
    
    await apolloServer.start();
    
    apolloServer.applyMiddleware({ app })
    const PORT = 8000;

    app.use(bodyParser.urlencoded({
        extended: true
      }));
    app.use(bodyParser.json())
    app.use(cors({
        origin: '*'
    }))
//---------------------- USERS ENDPOINTS ---------------------------------
    app.get('/users/:reqType', async (req, res) => {
        let { reqType } = req.params;
        const body = req.body;
        const headers = req.headers;

        if (reqType == 'allUsers') {
            reqType = '';
        }
        const response = await userRequests(reqType, 'GET', body, headers);
        res.status(200).jsonp(response);
    })

    app.post('/users/:reqType', async (req, res) => {
        const { reqType } = req.params;
        const body = req.body;
        const { authorization } = req.headers;
        const response = await userRequests(reqType, 'POST', body, { authorization });
        res.status(200).jsonp(response);
    })
    
    app.put('/users/:reqType', async (req, res) => {
        const { reqType } = req.params;
        const body = req.body;
        const { authorization } = req.headers;
        const response = await userRequests(reqType, 'PUT', body, { authorization });
        res.status(200).jsonp(response);
    })

//---------------------- TRANSACTIONS ENDPOINTS ---------------------------------
app.get('/transactions/:reqType', async (req, res) => {
    let { reqType } = req.params;
    const body = req.body;
    const headers = req.headers;

    const response = await transactionRequests(reqType, 'GET', body, headers);
    res.status(200).jsonp(response);
})

app.post('/transactions/:reqType/:stock', async (req, res) => {
    let { reqType, stock } = req.params;
    const body = req.body;
    const { action } = req.query;
    const { authorization } = req.headers;
    if (reqType == "stock") {
        reqType = `${reqType}/${stock}?action=${action}`
    }
    const response = await transactionRequests(reqType, 'POST', body, { authorization });
    res.status(200).jsonp(response);
})
//-------------------------------------------------------------------------------
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    })
}

start();
module.exports = app;