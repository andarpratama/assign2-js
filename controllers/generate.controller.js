const generateMarket = require('./generate.market')
const generateFarm = require('./generate.farm')
const generateBarrack = require('./generate.barrack')

const generate = () => {
   generateMarket()
   generateFarm()
   generateBarrack()
}

module.exports = generate

