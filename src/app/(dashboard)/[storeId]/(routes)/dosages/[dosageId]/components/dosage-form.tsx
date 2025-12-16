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
import { Dosage } from "@/generated/prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface DosageFormProps {
  initialData: Dosage | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type DosageFormValues = z.infer<typeof formSchema>;

export const DosageForm: React.FC<DosageFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit dosage" : "Create dosage";
  const description = initialData ? "Edit a dosage" : "Add a new dosage";
  const toastMessage = initialData ? "Dosage updated." : "Dosage created.";
  const action = initialData ? "Edit dosage" : "Create dosage";

  const form = useForm<DosageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: DosageFormValues) => {
    try {
      const { storeId, dosageId } = await params;

      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${storeId}/dosages/${dosageId}`, data);
      } else {
        await axios.post(`/api/${storeId}/dosages`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/dosages`);

      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/dosages/${params.dosageId}`);
      router.refresh();
      router.push(`/${params.storeId}/dosages`);
      toast.success("Dosage deleted!");
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this dosage first."
      );
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
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Dosage name (ex: Standard)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Ex: 500 mg, 10 mg/ml"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>

      <Separator />
    </>
  );
};
