const express = require('express');
const router = express.Router();
const data = require('../data.json');
const fs = require('fs');

// Get all products
router.get('/', (req,res) => {
    console.log(data.product);
    res.status(200).send(data.product);
});

module.exports = router;