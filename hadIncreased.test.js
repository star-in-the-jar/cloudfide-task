const { hadIncreased } = require('./hadIncreased.js')

test('Checks hadIncreased: price went up', () => {
    const prev = { averagePrice: 0.0001234 }
    const curr = { averagePrice: 0.0001242 }

    expect(hadIncreased(prev, curr)).toBe(true)
})

test('Checks hadIncreased: price went down', () => {
    const prev = { averagePrice: 0.0201234 }
    const curr = { averagePrice: 0.0001242 }

    expect(hadIncreased(prev, curr)).toBe(false)
})
