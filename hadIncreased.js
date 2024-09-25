const hadIncreased = (prevPeriod, currentPeriod) => prevPeriod.averagePrice < currentPeriod.averagePrice;

module.exports = {
    hadIncreased
}