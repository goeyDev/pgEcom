import { carts, products } from "@/db/schema";
import {
  cartItemSchema,
  paymentResultSchema,
  shippingAddressSchema,
} from "@/lib/validator";
import { InferSelectModel } from "drizzle-orm";
import z from "zod";

export type Product = InferSelectModel<typeof products>;

// Cart
export type Cart = InferSelectModel<typeof carts>;
export type CartItem = z.infer<typeof cartItemSchema>;

//Shipping
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

export type PaymentResult = z.infer<typeof paymentResultSchema>;
