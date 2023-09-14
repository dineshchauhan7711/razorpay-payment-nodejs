const router = require('express').Router();

//Controller
const CustomerController = require('../controller/customer.controller');

//Routes
router.post('/create-customer', CustomerController.createCustomer);
router.post('/create-order', CustomerController.createCustomerOrder);
router.post('/confirmed-payment', CustomerController.confirmPayment);
router.post('/capture-payment', CustomerController.capturePayment);


module.exports = router;
