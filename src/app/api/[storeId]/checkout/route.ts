// import Stripe from "stripe";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";

// import { stripe } from "@/lib/stripe";
// import prisma from "@/lib/prisma";

// const CORS_HEADERS = {
//   "Access-Control-Allow-Origin": "http://localhost:3001",
//   "Access-Control-Allow-Methods": "POST, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Stripe-Signature",
// };

// export async function OPTIONS() {
//   return new NextResponse(null, {
//     status: 200,
//     headers: CORS_HEADERS,
//   });
// }

// export async function POST(req: Request) {
//   const body = await req.text();

//   const headersList = await headers();
//   const signature = headersList.get("Stripe-Signature") as string;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       return new NextResponse(`Webhook Error: ${error.message}`, {
//         status: 400,
//       });
//     }

//     return new NextResponse("Webhook Error", { status: 400 });
//   }

//   const session = event.data.object as Stripe.Checkout.Session;
//   const address = session.customer_details?.address;

//   const addressComponents = [
//     address?.line1,
//     address?.line2,
//     address?.city,
//     address?.state,
//     address?.postal_code,
//     address?.country,
//   ];

//   const addressString = addressComponents
//     .filter((c): c is string => Boolean(c))
//     .join(", ");

//   if (event.type === "checkout.session.completed") {
//     const order = await prisma.order.update({
//       where: {
//         id: session.metadata?.orderId,
//       },
//       data: {
//         isPaid: true,
//         address: addressString,
//         phone: session.customer_details?.phone || "",
//       },
//       include: {
//         orderItems: true,
//       },
//     });

//     const productIds = order.orderItems.map((orderItem) => orderItem.productId);

//     await prisma.product.updateMany({
//       where: {
//         id: {
//           in: productIds,
//         },
//       },
//       data: {
//         isArchived: true,
//       },
//     });
//   }

//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "http://localhost:3001",
//     },
//   });
// }
import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  const { productIds } = await req.json();
  const { storeId } = await params;

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100,
      },
    });
  });

  const order = await prisma.order.create({
    data: {
      storeId: storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
