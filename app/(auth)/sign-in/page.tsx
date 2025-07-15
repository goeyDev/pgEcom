import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/contants";
import CredentialsSignInForm from "./credentials-signin-form";

// export const metadata: Metadata = {
//   title: `Sign In - ${APP_NAME}`,
// };

// export default async function SignIn({
//   searchParams: { callbackUrl },
// }: {
//   searchParams: {
//     callbackUrl: string;
//   };
// }) {
//   const session = await auth();
//   if (session) {
//     return redirect(callbackUrl || "/");
//   }

export const metadata: Metadata = {
  title: `Sign In - ${APP_NAME}`,
};

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams; // Resolve the Promise
  const callbackUrl =
    typeof params.callbackUrl === "string" ? params.callbackUrl : "/"; // Safely access callbackUrl

  const session = await auth();
  if (session) {
    return redirect(callbackUrl);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/assets/icons/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
            />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Select a method to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
