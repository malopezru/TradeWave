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

module.exports = {
    usersHost,
    transactionsHost
}
