/* eslint-disable class-methods-use-this */
const ApiError = require('../error/api-error');
// const devService = require('../service/dev'); // 這樣會有個問題, 因為要測試這個controller, 你必須要確定devService完全沒有問題



class DevController {
  constructor({ devService }) {
    this.devService = devService
    // bind(this) 之後, this.createDev 跟 this.getDev 的this永遠指向 DevController
    // 這樣才能訪問到 this.devService
    this.createDev = this.createDev.bind(this)
    this.getDev = this.getDev.bind(this)
  }

  async createDev(req, res) {
    try {
      const result = await this.devService.createDev(req.body);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json('error');
    }
  }

  async getDev(req, res, next) {
    try {
      const developerId = req.params.id;
      const developer = await this.devService.getDev(req.params.id);
      if (developer == null) {
        next(ApiError.notFound(`developer with id ${developerId} not found`));
        return;
      }
      res.json(developer);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DevController
