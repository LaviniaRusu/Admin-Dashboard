// import React from "react";
// import prismadb from "@/lib/prismadb";

// interface DashboardPageProps {
//   params: { storeId: string };
// }

// const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
//   const store = await prismadb.store.findFirst({
//     where: {
//       id: params.storeId,
//     },
//   });

//   return <div>Active Store: {store?.name}</div>;
// };

// export default DashboardPage;
import db from "@/lib/db";
import React from "react";

export default async function DashboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  const [rows] = await db.execute("SELECT * FROM Store WHERE id = ? LIMIT 1", [
    params.storeId,
  ]);

  const store = Array.isArray(rows) ? rows[0] : null;

  return <div>Active Store: {store?.name}</div>;
}
