import { InferSchemaType, model, Schema } from "mongoose";

const paymentIdStripeVerificationSchema = new Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  itsUsed: {
    type: Boolean,
    required: true,
  },
});

type PaymentIdStripeVerification = InferSchemaType<
  typeof paymentIdStripeVerificationSchema
>;

export default model<PaymentIdStripeVerification>(
  "PaymentIdStripeVerification",
  paymentIdStripeVerificationSchema
);
