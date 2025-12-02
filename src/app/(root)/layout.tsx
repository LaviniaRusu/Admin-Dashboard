// import { auth } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import prismadb from "@/lib/prisma";
// import React from "react";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const { id: userId } = user;

  console.log("userId", userId);

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
