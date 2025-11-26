"use cilent";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();
  return (
    <div>
      <Modal
        title="Create store"
        description="Add a new store to manage products and categories "
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
      >
        Future Create Storm Form
      </Modal>
    </div>
  );
};
