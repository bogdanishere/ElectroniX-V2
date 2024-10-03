import { RequestHandler } from "express";
import paymentIdStripeVerification from "../models/mongodb";

export const verifySessionStripe: RequestHandler = async (req, res, next) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ message: "No session id provided" });
  }

  try {
    const isSessionValid = await paymentIdStripeVerification.findOne({
      paymentId: sessionId,
    });

    if (!isSessionValid) {
      return res.status(403).json({
        message: "Invalid session ID. This may indicate a fraudulent attempt.",
      });
    }

    await paymentIdStripeVerification.deleteOne({ paymentId: sessionId });

    next();
  } catch (error) {
    next(error);
  }
};
