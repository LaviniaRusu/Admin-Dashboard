// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ sizeId: string }> }
// ) {
//   try {
//     const { sizeId } = await params;
//     if (!sizeId) {
//       return new NextResponse("Size id is required", { status: 400 });
//     }

//     const size = await prisma.size.findUnique({
//       where: {
//         id: sizeId,
//       },
//     });

//     return NextResponse.json(size);
//   } catch (error) {
//     console.log("[SIZE_GET]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

// export async function PATCH(
//   req: Request,
//   { params }: { params: Promise<{ storeId: string; sizeId: string }> }
// ) {
//   try {
//     const { storeId, sizeId } = await params;

//     const { userId } = await auth();
//     console.log(userId);

//     const body = await req.json();

//     const { name, value } = body;

//     if (!userId) {
//       return new NextResponse("Unauthenticated", { status: 401 });
//     }

//     if (!name) {
//       return new NextResponse("Name is required", { status: 400 });
//     }
//     if (!value) {
//       return new NextResponse("Value is required", { status: 400 });
//     }

//     if (!sizeId) {
//       return new NextResponse("Size id is required", { status: 400 });
//     }

//     const storeByUserId = await prisma.store.findFirst({
//       where: {
//         id: storeId,
//         userId,
//       },
//     });

//     if (!storeByUserId) {
//       return new NextResponse("Unauthorized", { status: 403 });
//     }

//     const size = await prisma.size.updateMany({
//       where: {
//         id: sizeId,
//       },
//       data: {
//         name,
//         value,
//       },
//     });

//     return NextResponse.json(size);
//   } catch (error) {
//     console.log("SIZE_PATCH]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: Promise<{ storeId: string; sizeId: string }> }
// ) {
//   try {
//     const { storeId, sizeId } = await params;
//     const { userId } = await auth();
//     console.log("USER:", userId, "STORE:", storeId);

//     if (!userId) {
//       return new NextResponse("Unauthenticated", { status: 401 });
//     }

//     if (!sizeId) {
//       return new NextResponse("Size id is required", { status: 400 });
//     }

//     const storeByUserId = await prisma.store.findFirst({
//       where: {
//         id: storeId,
//         userId,
//       },
//     });

//     if (!storeByUserId) {
//       return new NextResponse("Unauthorized", { status: 403 });
//     }

//     const size = await prisma.size.deleteMany({
//       where: {
//         id: sizeId,
//       },
//     });

//     return NextResponse.json(size);
//   } catch (error) {
//     console.log("[SIZE_DELETE]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ colorId: string }> }
) {
  try {
    const { colorId } = await params;
    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const color = await prisma.color.findUnique({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; colorId: string }> }
) {
  try {
    const { storeId, colorId } = await params;

    const { userId } = await auth();
    console.log(userId);

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

    if (!colorId) {
      return new NextResponse("color id is required", { status: 400 });
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

    const color = await prisma.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ storeId: string; colorId: string }> }
) {
  try {
    const { storeId, colorId } = await params;
    const { userId } = await auth();
    console.log("USER:", userId, "STORE:", storeId);

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!colorId) {
      return new NextResponse("color id is required", { status: 400 });
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

    const color = await prisma.color.deleteMany({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
