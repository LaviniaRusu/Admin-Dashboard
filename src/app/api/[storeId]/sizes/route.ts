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
    const { name, value } = body;
    const { storeId } = await params;
    console.log("USER:", userId, "STORE:", storeId);

    if (!userId) {
      return new NextResponse("Unauthentificated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is requiered", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Image URL is requiered", { status: 400 });
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

    const size = await prisma.size.create({
      data: {
        name,
        value,
        storeId: storeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST]", error);
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

    const sizes = await prisma.size.findMany({
      where: {
        storeId: storeId,
      },
    });
    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
