const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse')

const processFile = async (filename, headers) => {
    const records = []

    const csvFilePath = path.resolve(__basedir, filename)

    const parser = fs.createReadStream(csvFilePath, { encoding: 'utf-8' }).pipe(parse({ delimiter: ',', columns: headers, fromLine: 2 }))

    for await (const record of parser) {
        records.push(record)
    }

    fs.unlinkSync(csvFilePath)

    return records
}

module.exports = processFile