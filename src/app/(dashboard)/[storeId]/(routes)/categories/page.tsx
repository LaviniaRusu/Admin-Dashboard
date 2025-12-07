// import { BillboardClient } from "./components/client";

// const BillboardsPage = () => {
//   return (
//     <div className="flex-col">
//       <div className="flex-1 space-y-4 p-8 pt-6">
//         <BillboardClient />
//       </div>
//     </div>
//   );
// };

// export default BillboardsPage;
////cod ok
// import prismadb from "@/lib/prisma";
// import { format } from "date-fns";
// import { BillboardClient } from "./components/client";
// import { BillboardColumn } from "./components/columns";

// const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
//   const billboards = await prismadb.billboard.findMany({
//     where: {
//       storeId: params.storeId,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
//     id: item.id,
//     label: item.label,
//     createdAt: format(item.createdAt, "MMMM do, yyyy"),
//   }));
//   return (
//     <div className="flex-col">
//       <div className="flex-1 space-y-4 p-8 pt-6">
//         <BillboardClient data={billboards} />
//       </div>
//     </div>
//   );
// };

// export default BillboardsPage;
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;
  const categories = await prisma.category.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
