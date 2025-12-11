import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//  DOAR rutele de admin sunt protejate
const isProtectedRoute = createRouteMatcher([
  "/api/:storeId/(billboards|categories|products|sizes|colors)", // POST etc
  "/(.*)/settings",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req) && req.method !== "GET") {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
