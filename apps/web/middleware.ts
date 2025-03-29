import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/manager(.*)", "/crew(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
  const role = sessionClaims?.role;
  //if (userId && !role)
  //throw new Error("Role not defined pls contack the admin");
  //if (userId && role === "CREW" && req.url.startsWith("/manager")) {
  //  throw new Error("Un Authorized for this Page");
  //}
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
