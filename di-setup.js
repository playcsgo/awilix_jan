const awilix = require('awilix')

const DevController = require('./controller/dev')
const DevService = require('./service/dev')
const DevDao = require('./dao/dev')
const db = require('./db')  // 他會去找index

// in proxy method
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  // strict: true,
})

function setup() {
  container.register({
    devController: awilix.asClass(DevController),

    devService: awilix.asClass(DevService),

    devDao: awilix.asClass(DevDao),

    db: awilix.asValue(db)  // 因為 db是一個由knexjs創建好的instance, 所以用asValue
  })
}


module.exports = {
  setup,
  container
}
