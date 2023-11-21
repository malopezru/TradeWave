const usersHost = {
    url: 'user-auth-app',
    port: '4000',
    entryPoint: 'users'
} 

const transactionsHost = {
    url: 'transactions-app',
    port: '5000',
    entryPoint: 'transactions'
} 
const predictionsHost = {
    url: 'prediction-app',
    port: '7651',
}

module.exports = {
    usersHost,
    transactionsHost,
    predictionsHost
}
