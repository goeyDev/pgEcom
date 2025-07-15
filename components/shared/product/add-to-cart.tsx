"use client";

import { Button } from "@/components/ui/button";
// import { ToastAction } from "@/components/ui/toast";
// import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { Loader, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function AddToCart({
  cart,
  item,
}: {
  cart?: Cart;
  item: Omit<CartItem, "cartId">;
}) {
  const router = useRouter();
  // const { toast } = useToast();

  const [isPending, startTransition] = useTransition();
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);
  return existItem ? (
    <div>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const res = await removeItemFromCart(item.productId);
            if (res.success) {
              toast.success(res.message);
            } else {
              toast.error(res.message);
            }
            // toast({
            //   variant: res.success ? "success" : "error",
            //   description: res.message,
            // });
            return;
          });
        }}
      >
        {isPending ? (
          <Loader className="w-4 h-4  animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const res = await addItemToCart(item);
            if (res.success) {
              toast.success(res.message);
            } else {
              toast.error(res.message);
            }
            // toast({
            //   variant: res.success ? "default" : "destructive",
            //   description: res.message,
            // });
            return;
          });
        }}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const res = await addItemToCart(item);
          if (!res.success) {
            toast.error(res.message);
            // toast({
            //   variant: "destructive",
            //   description: res.message,
            // });
            return;
          }
          // toast.success(`${item.name} added to the cart`);
          toast("Go to cart", {
            description: `${item.name} added to the cart`,
            action: {
              label: "Go to Cart",
              onClick: () => router.push("/cart"),
            },
            className: "toast-with-action", // Optional: Style the entire toast
          });
          // toast({
          // description: `${item.name} added to the cart`,
          // action: (
          //   <ToastAction
          //     className="bg-primary"
          //     onClick={() => router.push("/cart")}
          //     altText="Go to cart"
          //   >
          //     Go to cart
          //   </ToastAction>
          // ),
          // });
        });
      }}
    >
      {isPending ? <Loader className="animate-spin" /> : <Plus />}
      Add to cart
    </Button>
  );
}
