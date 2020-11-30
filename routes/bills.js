const express = require('express');
const router = express.Router();
const data = require('../data.json');
const fs = require('fs');

// Get user's bill
router.get('/:order_id', (req,res) => {
    var orderID = req.params.order_id;
    fs.readFile('data.json', function(err, data){
        if (err){
            console.log(err);
        } 
        else 
        {
            // Convert data from string to object
            var billObj = JSON.parse(data);

            // Add user info with matched user_id
            var getBill = billObj.bill.find((bill) => bill.order_id == orderID);
            
            if (!getBill) {
                res.status(500).send('No bill found');
            }
            else 
            {
                console.log('Bill ' + getBill.bill_id);
                res.status(200).send('Order ' + getBill.bill_id);
            }
    }});
});

// Create bill

var bill_id = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

router.post('/:order_id/create', (req,res) => {
    console.log(req.body);
    var orderID = req.params.order_id;
    fs.readFile('data.json', function(err, data){
        if (err){
            console.log(err);
        } 
        else 
        {
            // Convert data from string to object
            var billObj = JSON.parse(data);

            // Add object's properties
            billObj.bill.push({
                bill_id: bill_id(),
                price: req.body.price,
                created_at: Date.now(),
                order_id: orderID
            }); 
            
            // Convert it back to string
            var strBill = JSON.stringify(billObj, null, 4); 

            // Write to users.json
            fs.writeFile('data.json', strBill, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log('Bill created');
                    res.status(200).send('Bill created');
                }
            });
    }});
});

// Delete bill
router.delete('/:bill_id', (req,res) => {
    var billID = req.params.bill_id;
    fs.readFile('data.json', function(err, data){
        if (err){
            console.log(err);
        } 
        else 
        {
            // Convert data from string to object
            var billObj = JSON.parse(data);
            
            var u = billObj.bill;

            // Filter the user who has user_id different to UserID and save to userObj
            billObj.bill = u.filter((bill) => {
                return bill.bill_id !== billID;
            });

            // Convert it back to string
            var strBill = JSON.stringify(billObj, null, 4);

            fs.writeFile('data.json', strBill, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log('Bill ' + billID + ' deleted');
                }
            });
            res.status(200).send('Bill ' + billID + ' deleted');
        }
    });
});

module.exports = router;