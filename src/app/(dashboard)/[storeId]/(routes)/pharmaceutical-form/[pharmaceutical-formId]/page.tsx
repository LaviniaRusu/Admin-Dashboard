import prisma from "@/lib/prisma";
import { PharmaceuticalFormForm } from "./components/pharmaceutical-form-form";

const PharmaceuticalFormPage = async ({
  params,
}: {
  params: Promise<{ "pharmaceutical-formId": string }>;
}) => {
  const { "pharmaceutical-formId": formId } = await params;

  const form = await prisma.pharmaceuticalForm.findUnique({
    where: {
      id: formId,
    },
  });

  return (
    <div className="p-6">
      <PharmaceuticalFormForm initialData={form} />
    </div>
  );
};

export default PharmaceuticalFormPage;
