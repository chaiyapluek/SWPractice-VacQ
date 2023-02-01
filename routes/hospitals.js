const express = require('express')
const router = express.Router()

const {createHospital, deleteHsopital, getHospital, getHospitals, updateHospital} = require('../controllers/hospitals')

router.route('/').get(getHospitals).post(createHospital)
router.route('/:id').get(getHospital).put(updateHospital).delete(deleteHsopital)

module.exports = router