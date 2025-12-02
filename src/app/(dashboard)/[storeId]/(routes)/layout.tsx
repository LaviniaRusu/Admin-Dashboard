// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// import prismadb from "@/lib/prismadb";
// import React from "react";

// export default async function SetupLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { userId } = auth();

//   if (!userId) {
//     redirect("/sign-in");
//   }

//   const store = await prismadb.store.findFirst({
//     where: {
//       userId,
//     },
//   });

//   if (store) {
//     redirect(`/${store.id}`);
//   }

//   return <>{children}</>;
// }
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import db from "@/lib/db";
import React from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const [rows] = await db.execute(
    "SELECT * FROM Store WHERE id = ? AND userId = ? LIMIT 1",
    [params.storeId, userId]
  );

  const store = Array.isArray(rows) ? rows[0] : null;

  if (!store) {
    redirect("/");
  }

  return (
    <div>
      <div>This will be a Navbar</div>
      {children}
    </div>
  );
}
