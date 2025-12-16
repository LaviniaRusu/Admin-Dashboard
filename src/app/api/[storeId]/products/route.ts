import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { userId } = await auth();
    // const userId = "1";

    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      pharmaceuticalFormId,
      images,
      isFeatured,
      isArchived,
    } = body;
    const { storeId } = await params;
    console.log("USER:", userId, "STORE:", storeId);

    if (!userId) {
      return new NextResponse("Unauthentificated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Label is requiered", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("Image are required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Image URL is requiered", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("ICategory Id is requiered", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Size Id is requiered", { status: 400 });
    }
    if (!pharmaceuticalFormId) {
      return new NextResponse("  Pharmaceutical Form Id, is requiered", {
        status: 400,
      });
    }
    if (!colorId) {
      return new NextResponse("Color Id  is requiered", { status: 400 });
    }
    if (!storeId) {
      return new NextResponse("Store Id is requiered", { status: 400 });
    }
    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        pharmaceuticalFormId,
        storeId: storeId,

        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const pharmaceuticalFormId =
      searchParams.get("   pharmaceuticalFormId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    const { storeId } = await params;
    if (!storeId) {
      return new NextResponse("Store Id is requiered", { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        storeId: storeId,
        categoryId,
        colorId,
        sizeId,
        pharmaceuticalFormId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
        pharmaceuticalForm: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
