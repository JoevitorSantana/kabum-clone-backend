const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const stripe = require('stripe')('sk_test_51LLUArIsEqwuAs3zzMtVVhzuOaezvwM8dDNyqjuypoIIfH8kAs6uw6t8XgMaNPhaoWQKPzkXAXOlVjJPsUTI9Lzv00vbdO77xu');


exports.Payment = catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'brl',
        metadata: {
            company: 'MERN'
        }
    });

    res
        .status(200)
        .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async(req, res, next) => {
    res.status(200).json({stripeApiKey: 'pk_test_51LLUArIsEqwuAs3z70CJx0Lg6fVZXnSDcf8dbHB73W1ykbJ9dGjlJNJVvDhEkDeBaknMrfM7E98xaP3c1ucl0ZBG00jNTYhLZm'});
});

