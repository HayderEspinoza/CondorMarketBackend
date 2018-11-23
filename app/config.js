module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.MONGODB || 'mongodb://localhost:27017/condor_market',
    SECRET_TOKEN: 'C0ND0RM4RK37',
    URL_WEB: 'http://localhost:5000',
    APP_NAME: 'Condor Market',
}
