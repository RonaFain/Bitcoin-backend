const airtable = require('airtable')
const base = airtable.base('appG83Ni1iMw90anN')

const btcTable = base('BTC Table')


module.exports = {
    create
}

function create(record, offlineRecords, isOfflineRecord) {
    btcTable.create([
        {
            fields: {
                Time: record.time, 
                Rates: record.rate
            }
        }
    ], (err) => {
        if(err && !isOfflineRecord) {
            offlineRecords.push(record)
        } else if(!err && isOfflineRecord) {
            offlineRecords.shift()
        }
    })
}