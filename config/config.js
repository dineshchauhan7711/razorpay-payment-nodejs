require('dotenv').config();

module.exports = {
    server: {
        protocol: process.env.PROTOCOL || 'http',
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || '3000',
        DB_URL: process.env.DB_URL || ''
    },
    sslCertificates: {
        privKey: process.env.PRIVKEY_PATH,
        fullchain: process.env.FULLCHAIN_PATH
    },
    razorPay: {
        key_id: process.env.RAZOR_PAY_KEY_ID,
        key_secret: process.env.RAZOR_PAY_KEY_SECRET
    }

}