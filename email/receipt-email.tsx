import * as React from "react";
import { Html, Head, Text } from "@react-email/components";

export default function Email() {
  return (
    <Html lang="en">
      <Head />
      <Text>Hi! Your order has been received.</Text>
    </Html>
  );
}
