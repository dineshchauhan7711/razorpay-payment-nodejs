const Razorpay = require('razorpay');
const config = require('../config/config');
const crypto = require('crypto');


// Models
const Customer = require('../models/customer.model');


//Create instance
var instance = new Razorpay({
    key_id: config.razorPay.key_id,
    key_secret: config.razorPay.key_secret,
});

//create customer to razor pay
const createRazorPayCustomerAccount = async (name, email, mobile_number) => {
    let response;
    try {

        const customer = await instance.customers.create({
            name: name,
            contact: mobile_number,
            email: email,
            fail_existing: 1,

        })
        response = {
            success: true,
            razor_pay_id: customer.id
        }
    } catch (error) {
        response = {
            success: false,
            message: error
        }
    } finally {
        return response;
    }

};

//create order to razor pay
const createOrder = async () => {
    let response;
    try {
        const data = await instance.orders.create({
            amount: 50000,
            currency: "INR",
            receipt: "receipt#1",
            notes: {
                key1: "value3",
                key2: "value2"
            }
        })
        response = {
            success: true,
            data: data
        }
    } catch (error) {
        response = {
            success: false,
            message: error
        }
    } finally {
        return response;
    }
}

//Confirmed payment to razor pay
const confirmPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    let response;
    try {
        var data = razorpay_order_id + "|" + razorpay_payment_id;

        var exceptedSignature = crypto.createHmac('sha256', config.razorPay.key_secret)
            .update(data.toString())
            .digest("hex");

        if (exceptedSignature === razorpay_signature) {
            response = {
                success: true,
                message: "Payment success"
            }
        } else {
            response = {
                success: false,
                message: "Payment fail"
            }
        }
    } catch (error) {
        response = {
            success: false,
            message: error
        }
    } finally {
        return response;
    }
}

//Capture payment to razor pay
const capturePayment = async (payment_id, amount, currency) => {
    let response;
    try {

        const data = await instance.payments.capture(payment_id, amount, currency);
        console.log("Data====>", data);
        response = {
            success: true,
            data: data
        }
    } catch (error) {
        response = {
            success: false,
            message: error
        }
    } finally {
        return response;
    }
}



module.exports = {
    createRazorPayCustomerAccount,
    createOrder,
    confirmPayment,
    capturePayment
}