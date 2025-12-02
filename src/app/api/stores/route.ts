// import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();
//     const body = await req.json();
//     const { name } = body;

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     if (!name) {
//       return new NextResponse("Name is requiered", { status: 400 });
//     }
//     const store = await prisma.store.create({
//       data: {
//         name,
//         userId,
//       },
//     });
//     return NextResponse.json(store);
//   } catch (error) {
//     console.log("[STORE_POST]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import db from "@/lib/db";
// import { randomUUID } from "crypto";

// export async function POST(req: Request) {
//   try {
//     // Clerk – ia userul logat
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const body = await req.json();
//     const { name } = body;

//     if (!name) {
//       return new NextResponse("Name is required", { status: 400 });
//     }

//     const id = randomUUID();

//     // Inserăm în MySQL
//     await db.execute(
//       "INSERT INTO Store (id, name, userId, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
//       [id, name, userId]
//     );

//     // (opțional) luăm înapoi store-ul creat
//     const [rows] = await db.execute(
//       "SELECT id, name, userId, createdAt, updatedAt FROM Store WHERE id = ?",
//       [id]
//     );

//     const store = Array.isArray(rows) ? rows[0] : rows;

//     return NextResponse.json(store);
//   } catch (error) {
//     console.error("[STORE_POST_ERROR]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
// import { NextResponse } from "next/server";
// import db from "@/lib/db";
// import { randomUUID } from "crypto";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name } = body;

//     if (!name) {
//       return new NextResponse("Name is required", { status: 400 });
//     }

//     const id = randomUUID();
//     const userId = "test-user"; // sau NULL

//     await db.execute(
//       "INSERT INTO Store (id, name, userId, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
//       [id, name, userId]
//     );

//     const [rows] = await db.execute("SELECT * FROM Store WHERE id = ?", [id]);

//     return NextResponse.json(rows[0]);
//   } catch (error) {
//     console.error("[STORE_POST_ERROR]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// // }
// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";

// import db from "@/lib/db";
// import { randomUUID } from "crypto";

// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();
//     if (!userId) return new NextResponse("Unauthorized", { status: 401 });

//     const body = await req.json();
//     const { name } = body;

//     const id = randomUUID();

//     await db.execute(
//       "INSERT INTO Store (id, name, userId, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
//       [id, name, userId]
//     );

//     const [rows] = await db.execute("SELECT * FROM Store WHERE id = ?", [id]);

//     const store = Array.isArray(rows) ? rows[0] : rows;

//     return NextResponse.json(store);
//   } catch (err) {
//     console.error(err);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    // const { userId } = auth();
    // if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { name } = body;

    const id = randomUUID();

    await db.execute(
      "INSERT INTO Store (id, name, userId, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
      [id, name, 1]
    );

    const [rows] = await db.execute("SELECT * FROM Store WHERE id = ?", [id]);

    const store = Array.isArray(rows) ? rows[0] : rows;

    return NextResponse.json(store);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
