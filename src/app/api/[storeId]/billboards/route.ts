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
    const { label, imageUrl } = body;
    const { storeId } = await params;
    console.log("USER:", userId, "STORE:", storeId);

    if (!userId) {
      return new NextResponse("Unauthentificated", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label is requiered", { status: 400 });
    }
    if (!imageUrl) {
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

    const billboard = await prisma.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is requiered", { status: 400 });
    }

    const billboards = await prisma.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
