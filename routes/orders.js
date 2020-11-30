const express = require('express');
const router = express.Router();
const data = require('../data.json');
const fs = require('fs');

// // Get all orders
// router.get('/', (req,res) => {
//     console.log(data.order);
//     res.status(200).send(data.order);
// });

// Get user's order
router.get('/:user_id', (req,res) => {
    var userID = req.params.user_id;
    fs.readFile('data.json', function(err, data){
        if (err){
            console.log(err);
        } 
        else 
        {
            // Convert data from string to object
            var orderObj = JSON.parse(data);

            // Add user info with matched user_id
            var getOrder = orderObj.order.find((order) => order.user_id == userID);
            
            if (!getOrder) {
                res.status(500).send('Cart is empty');
            }
            else 
            {
                console.log('Order ' + getOrder.order_id);
                res.status(200).send('Order ' + getOrder.order_id);
            }
    }});
});

module.exports = router;