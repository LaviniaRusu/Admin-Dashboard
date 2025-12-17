import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ dosageId: string }> }
) {
  try {
    const { dosageId } = await params;

    if (!dosageId) {
      return new NextResponse("Dosage id is required", { status: 400 });
    }

    const dosage = await prisma.dosage.findUnique({
      where: {
        id: dosageId,
      },
    });

    return NextResponse.json(dosage);
  } catch (error) {
    console.log("[DOSAGE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; dosageId: string }> }
) {
  try {
    const { storeId, dosageId } = await params;

    const { userId } = await auth();

    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!dosageId) {
      return new NextResponse("Dosage id is required", { status: 400 });
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

    const dosage = await prisma.dosage.updateMany({
      where: {
        id: dosageId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(dosage);
  } catch (error) {
    console.log("[DOSAGE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ storeId: string; dosageId: string }> }
) {
  try {
    const { storeId, dosageId } = await params;
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!dosageId) {
      return new NextResponse("Dosage id is required", { status: 400 });
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

    const dosage = await prisma.dosage.deleteMany({
      where: {
        id: dosageId,
      },
    });

    return NextResponse.json(dosage);
  } catch (error) {
    console.log("[DOSAGE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
