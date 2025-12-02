// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
// REMOVE this entire file if you don't need auth for API routes.
// Or use the new proxy system:

// export { clerkMiddleware as middleware } from "@clerk/nextjs/server";

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/api/stores"],
// };
// src/middleware.ts
// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // rute pe care vrei să ruleze middleware-ul
//     "/((?!.*\\..*|_next).*)",
//     "/(api|trpc)(.*)",
//   ],
// };
export { clerkMiddleware as middleware } from "@clerk/nextjs/server";

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/api/stores"],
};
