/* eslint-disable class-methods-use-this */
const ApiError = require('../error/api-error');
const devService = require('../service/dev'); // 這樣會有個問題, 因為要測試這個controller, 你必須要確定devService完全沒有問題

class DevController {
  async createDev(req, res) {
    try {
      const result = await devService.createDev(req.body);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json('error');
    }
  }

  async getDev(req, res, next) {
    try {
      const developerId = req.params.id;
      const developer = await devService.getDev(req.params.id);
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
