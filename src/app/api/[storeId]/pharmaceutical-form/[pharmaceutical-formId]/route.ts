import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET single pharmaceutical form
 */
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ "pharmaceutical-formId": string }>;
  }
) {
  try {
    const { "pharmaceutical-formId": pharmaceuticalFormId } = await params;

    if (!pharmaceuticalFormId) {
      return new NextResponse("Pharmaceutical form id is required", {
        status: 400,
      });
    }

    const pharmaceuticalForm = await prisma.pharmaceuticalForm.findUnique({
      where: {
        id: pharmaceuticalFormId,
      },
    });

    return NextResponse.json(pharmaceuticalForm);
  } catch (error) {
    console.log("[PHARMACEUTICAL_FORM_GET_BY_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

/**
 * UPDATE pharmaceutical form
 */
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      storeId: string;
      "pharmaceutical-formId": string;
    }>;
  }
) {
  try {
    const { userId } = await auth();
    const { storeId, "pharmaceutical-formId": pharmaceuticalFormId } =
      await params;

    const body = await req.json();
    const { name, code, route } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name || !code || !route) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (!pharmaceuticalFormId) {
      return new NextResponse("Pharmaceutical form id is required", {
        status: 400,
      });
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

    const pharmaceuticalForm = await prisma.pharmaceuticalForm.updateMany({
      where: {
        id: pharmaceuticalFormId,
      },
      data: {
        name,
        code,
        route,
      },
    });

    return NextResponse.json(pharmaceuticalForm);
  } catch (error) {
    console.log("[PHARMACEUTICAL_FORM_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

/**
 * DELETE pharmaceutical form
 */
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      storeId: string;
      "pharmaceutical-formId": string;
    }>;
  }
) {
  try {
    const { userId } = await auth();
    const { storeId, "pharmaceutical-formId": pharmaceuticalFormId } =
      await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!pharmaceuticalFormId) {
      return new NextResponse("Pharmaceutical form id is required", {
        status: 400,
      });
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

    const pharmaceuticalForm = await prisma.pharmaceuticalForm.deleteMany({
      where: {
        id: pharmaceuticalFormId,
      },
    });

    return NextResponse.json(pharmaceuticalForm);
  } catch (error) {
    console.log("[PHARMACEUTICAL_FORM_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
