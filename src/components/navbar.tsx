import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const { id: userId } = user;

  console.log("userId", userId);
  // const { userId } = auth();

  // if (!userId) {
  //   redirect("/sign-in");
  // }
  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />

        <div className="ml-4">This will be the routes</div>

        <MainNav />

        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
