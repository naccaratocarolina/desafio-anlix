const { Router } = require('express');
const { model } = require('../config/sequelize.js');

const PatientController = require('../controllers/PatientController.js');

const router = Router();

// Rotas de Patient
router.get('/patients', PatientController.index);
router.get('/patients/:id', PatientController.show);
router.post('/patients', PatientController.create);
router.put('/patients/:id', PatientController.update);
router.delete('/patients/:id', PatientController.destroy);

module.exports = router;
