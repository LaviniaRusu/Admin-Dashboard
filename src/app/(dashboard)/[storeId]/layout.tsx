// import { auth } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const { id: userId } = user;

  console.log("userId", userId);
  // if (!userId) {
  //   redirect("/sign-in");
  // }

  // const store = await prisma.store.findFirst({
  //   where: {
  //     id: params.storeId,
  //     userId,
  //   },
  // });

  // if (!store) {
  //   redirect("/");
  // }

  return (
    <div>
      <div>This will be a Navbar</div>
      {children}
    </div>
  );
}
