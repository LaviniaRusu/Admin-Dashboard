import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function requireAdminUser() {
  const allow =
    process.env.ADMIN_ALLOWLIST?.split(",").map((s) =>
      s.trim().toLowerCase(),
    ) ?? [];

  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await clerkClient.users.getUser(userId);

  const email =
    user.emailAddresses
      .find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress?.toLowerCase() ??
    user.emailAddresses[0]?.emailAddress?.toLowerCase();

  if (!email || !allow.includes(email)) redirect("/");

  return { user, email };
}

export async function isAdminApiRequest(): Promise<boolean> {
  const allow =
    process.env.ADMIN_ALLOWLIST?.split(",").map((s) =>
      s.trim().toLowerCase(),
    ) ?? [];

  const { userId } = auth();
  if (!userId) return false;

  const user = await clerkClient.users.getUser(userId);

  const email =
    user.emailAddresses
      .find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress?.toLowerCase() ??
    user.emailAddresses[0]?.emailAddress?.toLowerCase();

  if (!email) return false;
  return allow.includes(email);
}
