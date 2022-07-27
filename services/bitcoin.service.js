const axios = require('axios')

module.exports = {
    getRate
}

async function getRate() {
    try {
        const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`)
        const exchangeRate = 1 / res.data
        return Promise.resolve(exchangeRate)
    } catch (err) {
        throw err
    }
}