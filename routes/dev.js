const express = require('express');
const validate = require('../middleware/validate');
const developerDto = require('../dto/developer');
// const devController = require('../controller/dev');

// import DI
const { container } = require('../di-setup')
const devController = container.resolve('devController')


const router = express.Router();
router.post('/', validate(developerDto), devController.createDev);
router.get('/:id', devController.getDev);

module.exports = router;
