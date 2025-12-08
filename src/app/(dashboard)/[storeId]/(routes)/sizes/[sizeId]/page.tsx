// const BillboardPage = () => {
//   return <div>This is a form for billboards</div>;
// };

// import prisma from "@/lib/prisma";

// export default BillboardPage;
// import prisma from "@/lib/prisma";
// import { BillboardForm } from "./components/billboard-form";

// const BillboardPage = async ({
//   params,
// }: {
//   params: { billboardId: string };
// }) => {
//   const billboard = await prisma.billboard.findUnique({
//     where: {
//       id: params.billboardId,
//     },
//   });

//   return (
//     <div className="flex-col">
//       <div className="flex-1 space-y-4 p-8 pt-6">
//         <BillboardForm initialData={billboard} />
//       </div>
//     </div>
//   );
// };

// export default BillboardPage;
// import prisma from "@/lib/prisma";

// const BillboardPage = async ({
//   params,
// }: {
//   params: Promise<{ billboardId: string }>;
// }) => {
//   const { billboard } = await params;
//   const billboard = await prisma.billboard.findUnique({
//     where: {
//       id: billboardId,
//     },
//   });
//   console.log("params:", params);

//   return <div>Existing Billboard: {billboard?.label}</div>;
// };

// export default BillboardPage;
//////////////////////

import prisma from "@/lib/prisma";
import { SizeForm } from "./components/size-form";
import ImageUpload from "@/components/ui/image-upload";

const SizePage = async ({
  params,
}: {
  params: Promise<{ sizeId: string }>;
}) => {
  const { sizeId } = await params;
  const size = await prisma.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return (
    <div>
      <SizeForm initialData={size} />
      {/* <ImageUpload /> */}
    </div>
  );
};

export default SizePage;
