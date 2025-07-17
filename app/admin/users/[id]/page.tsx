import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import { APP_NAME } from "@/lib/contants";
import UpdateUserForm from "./update-user-form";

export const metadata: Metadata = {
  title: `Update user - ${APP_NAME}`,
};

export default async function UpdateUserPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);
  if (!user) notFound();
  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h1 className="h2-bold">Update User</h1>
      <UpdateUserForm user={user} />
    </div>
  );
}
