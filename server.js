require('dotenv').config()
const express = require('express')

const dbService = require('./services/db.service')
const bitcoinService = require('./services/bitcoin.service')

const app = express()
app.use(express.json())

const offlineRecords = []

setInterval(async () => {
    try {
        const rate = await bitcoinService.getRate()
        const record = { rate , time: new Date() }
        await dbService.create(record, offlineRecords , false)
        if(offlineRecords.length) {
            record.rate = offlineRecords[0].Rates
            record.time = offlineRecords[0].Time
            await dbService.create(record, offlineRecords , true)
        }  
    } catch (err) {
        console.log(err)
        throw new Error('Something went wrong' , err)
    }
}, 60 * 1000)


const port = process.env.PORT || 3030

app.listen(port, () => {
    console.log('Server is running on port: ' + port)
})

