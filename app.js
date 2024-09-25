const { hadIncreased } = require('./hadIncreased')

const getPrices = async (symbol, interval, startTime) => {

    // docs https://binance-docs.github.io/apidocs/spot/en/#uiklines
    const data = await fetch(`https://api.binance.com/api/v3/klines?startTime=${startTime}&symbol=${symbol}&interval=${interval}`)
        .then(response => response.json())

    const mappedData = data.map(measurement => ({
        openTime: measurement[0],
        openPrice: measurement[1],
        closePrice: measurement[4],
        closeTime: measurement[6],
        averagePrice: (measurement[1] + measurement[6]) / 2,
    }))

    return mappedData;
}


const visualizeData = (pricesChange, symbol) => {
    console.log(`The price of ${symbol} has changed accordingly: `)

    pricesChange.forEach((change, index) => {
        if (index % 100 === 0) {
            const date = new Date(change.timestamp)
            const [year, month, day, hour, minute, second] = [date.getFullYear(), date.getMonth(), date.getDay(), date.getHours, date.getMinutes, date.getSeconds]
            process.stdout.write(`\n${year}.${month}.${day}\n`)
        }

        process.stdout.write(change.hasIncreased ? '^' : 'v')
    })

    console.log()
}

const main = async () => {
    const [cryptoPair, period, timestamp] = ['LTCBTC', '1d', '1695637619']

    const pricesOverTime = await getPrices(cryptoPair, period, timestamp);

    const priceChangeOvertime = pricesOverTime.reduce((acc, pricePeriod, index) => {
        if (index == 0) return acc;

        const hasPriceIncreased = hadIncreased(pricesOverTime[index - 1], pricePeriod);

        return [...acc, { timestamp: pricePeriod.openTime, hasIncreased: hasPriceIncreased }]
    }, []);

    visualizeData(priceChangeOvertime, cryptoPair);
}

main()