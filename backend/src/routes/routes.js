const { Router } = require('express');
const { model } = require('../config/sequelize.js');

const PatientController = require('../controllers/PatientController.js');
const CharacteristicController = require('../controllers/CharacteristicController.js');

const router = Router();

// Rotas de Patient
router.get('/patients', PatientController.index);
router.get('/patients/:id', PatientController.show);
router.post('/patients', PatientController.create);
router.put('/patients/:id', PatientController.update);
router.delete('/patients/:id', PatientController.destroy);

// Rotas de Characteristic
router.get('/characteristics/', CharacteristicController.index);
router.get('/characteristics/patients/:id', CharacteristicController.indexPatientCharacteristic);
router.get('/characteristics/patients/indexes/:id', CharacteristicController.show);
router.post('/characteristics/patients/:id', CharacteristicController.create);
router.put('/characteristics/patients/:id', CharacteristicController.update);
router.delete('/characteristics/patients/:id', CharacteristicController.destroy);

module.exports = router;
