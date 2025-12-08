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
    const { name, billboardId } = body;
    const { storeId } = await params;
    console.log("USER:", userId, "STORE:", storeId);

    if (!userId) {
      return new NextResponse("Unauthentificated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is requiered", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard id is requiered", { status: 400 });
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

    const category = await prisma.category.create({
      data: {
        name,
        billboardId,
        storeId: storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;
    if (!storeId) {
      return new NextResponse("Store Id is requiered", { status: 400 });
    }

    const categories = await prisma.category.findMany({
      where: {
        storeId: storeId,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
