const { ApolloServer } = require("apollo-server-express");
const express = require('express');
const resolvers = require('./src/resolvers');
const { userTypeDefs } = require('./src/typeDefs');
const userRequests = require('./src/requests/userRequests');
const bodyParser = require('body-parser')

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

    app.post('/users/:reqType', (req, res) => {
        const { reqType } = req.params;
        const body = req.body;
        const headers = req.headers;
        const response = userRequests(reqType, 'POST', body, headers);
        res.status(200).jsonp(response);
    })

    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    })
}

start();
module.exports = app;