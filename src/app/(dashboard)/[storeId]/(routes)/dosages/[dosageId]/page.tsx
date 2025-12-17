import prisma from "@/lib/prisma";
import { DosageForm } from "./components/dosage-form";
import ImageUpload from "@/components/ui/image-upload";
import DosagesPage from "../page";

const DosagePage = async ({
  params,
}: {
  params: Promise<{ dosageId: string }>;
}) => {
  const { dosageId } = await params;

  const dosage = await prisma.dosage.findUnique({
    where: {
      id: dosageId,
    },
  });

  return (
    <div>
      <DosageForm initialData={dosage} />
      {/* <ImageUpload /> */}
    </div>
  );
};

export default DosagePage;
