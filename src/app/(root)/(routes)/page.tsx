// "use client";

// import { useStoreModal } from "@/hooks/use-store-modal";
// import { useEffect } from "react";
// import { useStore } from "zustand";

// const SetupPage = () => {
//   const onOpen = useStoreModal((state) => state.onOpen);
//   const isOpen = useStoreModal((state) => state.isOpen);
//   useEffect(() => {
//     if (!isOpen) {
//       onOpen();
//     }
//   }, [isOpen, onOpen]);
//   return null;
// };
// export default SetupPage;
///////////////cod ok/////////////
"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) return;

    const allow = (process.env.NEXT_PUBLIC_ADMIN_ALLOWLIST || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const email =
      (user as any)?.primaryEmailAddress?.emailAddress?.toLowerCase() ||
      (user as any)?.emailAddresses?.[0]?.emailAddress?.toLowerCase();

    if (!email || !allow.includes(email)) {
      alert("Cont nepermis pentru zona de admin. Se face deconectarea.");

      signOut();
      return;
    }

    if (!isOpen) {
      onOpen();
    }
  }, [isLoaded, isSignedIn, user, isOpen, onOpen, signOut]);

  return null;
};

export default SetupPage;
