

// Models
const Customer = require('../models/customer.model');

//Controllers
const payment = require('../controller/razor_pay.controller');

const createCustomer = async (req, res) => {
    try {
        const { name, email, mobile_number, password } = req.body;
        const customerAccount = await payment.createRazorPayCustomerAccount(name, email, mobile_number);
        if (!customerAccount.success) {
            return res.status(customerAccount.message.statusCode).json({
                success: false,
                message: customerAccount.message.error.description
            })
        };
        const customer = await Customer.create({ name, email, mobile_number, password });

        return res.status(201).json({
            success: true,
            message: "Create customer successfully",
            data: customer
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }

};

const createCustomerOrder = async (req, res) => {
    try {
        const Order = await payment.createOrder()
        return res.status(201).json({
            success: true,
            message: "Create order successfully",
            data: Order
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const confirmPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const paymentDetails = await payment.confirmPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
        if (!paymentDetails.status) {
            return res.status(400).json({
                success: false,
                message: "Payment failed",
            })
        }
        return res.status(201).json({
            success: true,
            message: "Payment success",
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
};


const capturePayment = async (req, res) => {
    try {
        const { payment_id, amount, currency } = req.body;

        const captureData = await payment.capturePayment(payment_id, amount, currency);

        if (captureData.status === 'captured') {
            // Payment is confirmed and captured
            console.log('Payment confirmed:', captureData);
            // Handle the successful payment
            return res.status(201).json({
                success: true,
                message: "Payment confirmed",
                data: method
            })
        } else {
            // Payment is pending or failed
            console.log('Payment status:', captureData.status);
            // Handle accordingly
            return res.status(400).json({
                success: true,
                message: "Payment failed",
                data: method
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

module.exports = {
    createCustomer,
    confirmPayment,
    createCustomerOrder,
    capturePayment
}