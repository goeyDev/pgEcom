import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsForm from "./order-details-form";
import { APP_NAME } from "@/lib/contants";
import { auth } from "@/auth";
import Stripe from "stripe";

export const metadata = {
  title: `Order Details - ${APP_NAME}`,
};

const OrderDetailsPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;
  const session = await auth();
  const order = await getOrderById(id);
  if (!order) notFound();
  order.user;

  // stripe
  let client_secret = null;
  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "USD",
      metadata: { orderId: order.id },
    });
    client_secret = paymentIntent.client_secret;
  }
  return (
    <OrderDetailsForm
      order={order}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
      isAdmin={session?.user.role === "admin" || false}
      stripeClientSecret={client_secret}
    />
  );
};

export default OrderDetailsPage;
