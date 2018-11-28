const PORT = process.env.PORT || 3000;
module.exports = {
    PORT,
    DB: process.env.MONGODB || 'mongodb://localhost:27017/condor_market',
    HOST: process.env.URL || `http://localhost:${PORT}/`,
    UPLOADS: process.env.UPLOADS || 'public/uploads',
    SECRET_TOKEN: 'C0ND0RM4RK37',
    URL_WEB: 'http://localhost:5000',
    APP_NAME: 'Condor Market',
}
