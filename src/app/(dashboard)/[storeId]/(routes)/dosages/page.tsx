import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { DosagesClient } from "./components/client";
import { DosageColumn } from "./components/columns";

const DosagesPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const dosages = await prisma.dosage.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedDosages: DosageColumn[] = dosages.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DosagesClient data={formattedDosages} />
      </div>
    </div>
  );
};

export default DosagesPage;
