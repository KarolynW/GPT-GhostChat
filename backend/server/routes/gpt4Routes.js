const express = require('express');
const gpt4Controller = require('../controllers/gpt4Controller');

const router = express.Router();

router.post('/', gpt4Controller.handleGpt4Request);

module.exports = router;

