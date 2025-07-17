import { APP_NAME, SENDER_EMAIL } from "@/lib/contants";
import { Order } from "@/types";
// import { Resend } from "resend";
// Update the path based on actual file location
import * as React from "react";
import PurchaseReceiptEmail from "./purchase-receipt";
import { sendEmail } from "@/lib/gmail_config";

// const resend = new Resend(process.env.RESEND_API_KEY as string);
// await resend.emails.send({

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  if (!order.user.email) {
    throw new Error("User email is missing.");
  }

  await sendEmail({
    to: order.user.email,
    subject: "Order Confirmation",
    react: <PurchaseReceiptEmail order={order} />,
  });
};
