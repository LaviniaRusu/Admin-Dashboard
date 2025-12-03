import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import prismadb from "@/lib/prisma";
import { SettingsForm } from "./components/settings-form";
interface SettingsPageProps {
  params: {
    storeeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const { id: userId } = user;

  //   console.log("userId", userId);

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });
  //   if (store) {
  //     redirect("/");
  //   }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
