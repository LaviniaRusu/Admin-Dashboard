import React from "react";
import prisma from "@/lib/prisma";

const DashboardPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;
  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
};

export default DashboardPage;
