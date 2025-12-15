import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * CREATE pharmaceutical form
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeId } = await params;
    const body = await req.json();

    const { name, code, route } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!code) {
      return new NextResponse("Code is required", { status: 400 });
    }

    if (!route) {
      return new NextResponse("Route is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const pharmaceuticalForm = await prisma.pharmaceuticalForm.create({
      data: {
        name,
        code,
        route,
        storeId,
      },
    });

    return NextResponse.json(pharmaceuticalForm);
  } catch (error) {
    console.log("[PHARMACEUTICAL_FORM_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

/**
 * GET all pharmaceutical forms for store
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const pharmaceuticalForms = await prisma.pharmaceuticalForm.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(pharmaceuticalForms);
  } catch (error) {
    console.log("[PHARMACEUTICAL_FORM_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
