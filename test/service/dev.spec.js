const assert = require('assert').strict
const DevService = require('../../service/dev')


describe('devService', () => {
  describe('sanitize names', () => {
    const devService = new DevService({}) // 直接創建 new instance 進行測試
    it('should leave a correct speration of name as it', () => {
      const { fName, mNames, lName } = devService.sanitizeNames('John', 'Alexander', 'Smith')
      assert.strictEqual('John', fName)
      assert.strictEqual('Alexander', mNames)
      assert.strictEqual('Smith', lName)
    })

    it('name with space and only space', () => {
      const { fName, mNames, lName } = devService.sanitizeNames(
        '  Tom',
        'Anne  ',
        '   ',
        )
      assert.strictEqual('Tom', fName)
      assert.strictEqual('Anne', mNames)
      assert.strictEqual('', lName)
    })

    it('test null', () => {
      const { fName, mNames, lName } = devService.sanitizeNames(
        '  Sam',
        null,
        '   Lu  ',
        )
      assert.strictEqual('Sam', fName)
      assert.strictEqual(null, mNames)
      assert.strictEqual('Lu', lName)
    })
    
  })
})