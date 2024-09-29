import { RequestHandler } from "express";
import Stripe from "stripe";
import paymentIdStripeVerification from "../models/paymentIdStripeVerification";
import createHttpError from "http-errors";
import env from "../env";

export const paymentStripe: RequestHandler = async (req, res, next) => {
  const { price, currency } = req.body;

  try {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "Plata Produse",
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    const sameId = await paymentIdStripeVerification.findOne({
      paymentId: session.id,
    });

    if (sameId) {
      throw createHttpError(400, "Payment already exists");
    }

    await paymentIdStripeVerification.create({
      paymentId: session.id,
      itsUsed: false,
    });

    res.status(200).json({ url: session.url, status: "success" });
  } catch (error) {
    next(error);
  }
};
