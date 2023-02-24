const functions = require("firebase-functions");

const stripe = require("stripe")(
  "sk_test_51M0lQaKzco1s0qVzPwrYvHCNpiIfVlJ9XtEWzkz0Q2tCrW9bHG8bhAYZn6TwKEdFlkUxCyBVAqZsLaQx5HZaSho800WTgKkXr7",
  
  {
    apiVersion: "2022-12-01",
  }
);

exports.createStripeCheckout = functions.https.onRequest(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Please Enter a name" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500,
      currency: "gbp",
      payment_method_types: ["card"],
      metadata: { name },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({
      message: "Payment Request Created",
      clientSecret: clientSecret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
