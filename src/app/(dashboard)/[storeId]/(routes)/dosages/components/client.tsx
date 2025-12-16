"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { DosageColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface DosagesClientProps {
  data: DosageColumn[];
}

export const DosagesClient: React.FC<DosagesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Dosages (${data.length})`}
          description="Manage dosages for your store"
        />

        <Button onClick={() => router.push(`/${params.storeId}/dosages/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title="API" description="API calls for Dosages" />
      <Separator />

      <ApiList entityName="dosages" entityIdName="dosageId" />
    </>
  );
};
