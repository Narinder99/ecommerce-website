const User = require('../models/user')
const braintree = require('braintree')
require('dotenv').config()

const gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   '7mkbzw2bhfy2g4fm',
    publicKey:    '56fxqk9d9mrvdxrm',
    privateKey:   '3d7551cc126d90c8fe06e1c5f70be249'
});

exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(response)
        }
    })
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // charge
    let newTransaction = gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};