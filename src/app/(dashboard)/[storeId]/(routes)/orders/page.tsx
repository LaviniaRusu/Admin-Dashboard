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
import { BillboardClient, OrderClient } from "./components/client";
import { BillboardColumn, OrederColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;
  const orders = await prisma.order.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedOrders: OrederColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
