import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { PharmaceuticalFormClient } from "./components/client";
import { PharmaceuticalFormColumn } from "./components/columns";

const PharmaceuticalFormPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const pharmaceuticalForms = await prisma.pharmaceuticalForm.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedPharmaceuticalForms: PharmaceuticalFormColumn[] =
    pharmaceuticalForms.map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code,
      route: item.route,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PharmaceuticalFormClient data={formattedPharmaceuticalForms} />
      </div>
    </div>
  );
};

export default PharmaceuticalFormPage;
