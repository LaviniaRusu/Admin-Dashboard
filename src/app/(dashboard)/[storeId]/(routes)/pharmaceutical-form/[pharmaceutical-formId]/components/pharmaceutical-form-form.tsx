"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PharmaceuticalForm } from "@/generated/prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface PharmaceuticalFormProps {
  initialData: PharmaceuticalForm | null;
}

const formSchema = z.object({
  name: z.string().min(1, "Denumirea este obligatorie"),
  code: z.string().min(1, "Codul este obligatoriu"),
  route: z.string().min(1, "Calea de administrare este obligatorie"),
});

type FormValues = z.infer<typeof formSchema>;

export const PharmaceuticalFormForm: React.FC<PharmaceuticalFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData
    ? "Editează forma farmaceutică"
    : "Adaugă formă farmaceutică";

  const description = "Definește forma de administrare a medicamentului";

  const toastMessage = initialData
    ? "Forma farmaceutică a fost actualizată."
    : "Forma farmaceutică a fost creată.";

  const action = initialData ? "Salvează" : "Creează";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      code: "",
      route: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const { storeId, formId } = params as {
        storeId: string;
        formId: string;
      };

      if (initialData) {
        await axios.patch(
          `/api/${storeId}/pharmaceutical-forms/${formId}`,
          data
        );
      } else {
        await axios.post(`/api/${storeId}/pharmaceutical-forms`, data);
      }

      router.refresh();
      router.push(`/${storeId}/pharmaceutical-forms`);
      toast.success(toastMessage);
    } catch {
      toast.error("A apărut o eroare.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      const { storeId, formId } = params as {
        storeId: string;
        formId: string;
      };

      await axios.delete(`/api/${storeId}/pharmaceutical-forms/${formId}`);

      router.refresh();
      router.push(`/${storeId}/pharmaceutical-forms`);
      toast.success("Forma farmaceutică a fost ștearsă.");
    } catch {
      toast.error("Există produse asociate cu această formă.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Denumire</FormLabel>
                  <FormControl>
                    <Input placeholder="Comprimate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cod</FormLabel>
                  <FormControl>
                    <Input placeholder="tbl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="route"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cale de administrare</FormLabel>
                  <FormControl>
                    <Input placeholder="oral / extern / nazal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
