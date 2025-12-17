import prisma from "@/lib/prisma";
import { BillboardForm, ProductForm } from "./components/product-form";
import ImageUpload from "@/components/ui/image-upload";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string; storeId: string }>;
}) => {
  const { productId, storeId } = await params;
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      storeId: storeId,
    },
  });

  const sizes = await prisma.size.findMany({
    where: {
      storeId: storeId,
    },
  });
  const pharmaceuticalForms = await prisma.pharmaceuticalForm.findMany({
    where: {
      storeId: storeId,
    },
  });

  const colors = await prisma.color.findMany({
    where: {
      storeId: storeId,
    },
  });
  const dosages = await prisma.dosage.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div>
      <ProductForm
        categories={categories}
        colors={colors}
        sizes={sizes}
        dosages={dosages}
        initialData={product}
        pharmceuticalform={pharmaceuticalForms}
      />
    </div>
  );
};

export default ProductPage;
