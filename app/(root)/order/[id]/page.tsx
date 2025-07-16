import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsForm from "./order-details-form";
import { APP_NAME } from "@/lib/contants";

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
  const order = await getOrderById(id);
  if (!order) notFound();
  order.user;
  return <OrderDetailsForm order={order} />;
};

export default OrderDetailsPage;
