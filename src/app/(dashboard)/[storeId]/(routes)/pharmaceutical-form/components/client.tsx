"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, PharmaceuticalFormColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface PharmaceuticalFormClientProps {
  data: PharmaceuticalFormColumn[];
}

export const PharmaceuticalFormClient: React.FC<
  PharmaceuticalFormClientProps
> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Forme farmaceutice (${data.length})`}
          description="Gestionează formele farmaceutice ale magazinului"
        />

        <Button
          onClick={() =>
            router.push(`/${params.storeId}/pharmaceutical-form/new`)
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Adaugă formă nouă
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading
        title="API"
        description="Endpoint-uri API pentru forme farmaceutice"
      />

      <Separator />

      <ApiList
        entityName="pharmaceutical-form"
        entityIdName="pharmaceuticalFormId"
      />
    </>
  );
};
