const express = require('express');
const portfolioRoutes = require('./portfolio-routes');

const router = express.Router();

router.use('/portfolio', portfolioRoutes);

module.exports = router;
