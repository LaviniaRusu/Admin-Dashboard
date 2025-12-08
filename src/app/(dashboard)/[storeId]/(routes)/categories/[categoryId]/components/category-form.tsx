// "use client";

// import { AlertModal } from "@/components/modals/alert-modal";
// import { ApiAlert } from "@/components/ui/api-alert";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Heading } from "@/components/ui/heading";
// import ImageUpload from "@/components/ui/image-upload";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { Billboard } from "@/generated/prisma/client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Store } from "@prisma/client";
// import axios from "axios";
// import { Trash } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import * as z from "zod";

// interface BillboardFormProps {
//   initialData: Billboard | null;
// }
// const formSchema = z.object({
//   label: z.string().min(1),
//   imageUrl: z.string().min(1),
// });
// type BillboardFormValues = z.infer<typeof formSchema>;
// export const BillboardForm: React.FC<BillboardFormProps> = ({
//   initialData,
// }) => {
//   const params = useParams();
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const title = initialData ? "Edit billboard" : "Create billboard";
//   const description = initialData ? "Edit a billboard" : "Add a new billboard";
//   const toastMessage = initialData
//     ? "Billboard updated."
//     : "Billboard created.";
//   const action = initialData ? "Edit billboard" : "Create billboard";

//   const form = useForm<BillboardFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: initialData || {
//       label: "",
//       imageUrl: "",
//     },
//   });

//   const onSubmit = async (data: BillboardFormValues) => {
//     try {
//       console.log("params:", params);

//       console.log("data:", data);

//       const { storeId } = params;
//       const billboardId = params.billboardId;
//       setLoading(true);
//       if (initialData) {
//         await axios.patch(
//           `/api/${params.storeId}/billboards/${params.billboardId}`,
//           data
//         );
//       } else {
//         await axios.post(`/api/${params.storeId}/billboards`, data);
//       }
//       router.refresh();
//       router.push(`/${params.storeId}/billboards`);

//       toast.success(toastMessage);
//     } catch (error) {
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onDelete = async () => {
//     try {
//       setLoading(true);
//       await axios.delete(
//         `/api/${params.storeId}/billboards/${params.billboardId}`
//       );
//       router.refresh();
//       router.push("/");
//       toast.success("Billboard deleted!");
//     } catch (error) {
//       toast.error(
//         "Make sure you removed all categories using this billboard first."
//       );
//     } finally {
//       setLoading(false);
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       <AlertModal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         onConfirm={onDelete}
//         loading={loading}
//       />
//       <div className="flex items-center justify-between">
//         <Heading title={title} description={description} />
//         {initialData && (
//           <Button
//             disabled={loading}
//             variant="destructive"
//             size="sm"
//             onClick={() => setOpen(true)}
//           >
//             <Trash className="h-4 w-4" />
//           </Button>
//         )}
//       </div>
//       <Separator />
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-8 w-full"
//         >
//           {" "}
//           <FormField
//             control={form.control}
//             name="imageUrl"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Background imagine</FormLabel>

//                 <FormControl>
//                   <ImageUpload
//                     value={field.value ? [field.value] : []}
//                     disabled={loading}
//                     onRemove={() => field.onChange("")}
//                     onChange={(url) => {
//                       console.log("url", url);
//                       field.onChange(url);
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="grid grid-cols-3 gap-8">
//             <FormField
//               control={form.control}
//               name="label"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Label</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={loading}
//                       placeholder="Billboard label"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <Button disabled={loading} className="ml-auto" type="submit">
//             {action}
//           </Button>
//         </form>
//       </Form>
//       <Separator />
//     </>
//   );
// };
"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Billboard, Category } from "@/generated/prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface CategoryFormProps {
  initialData: Category | null;
  billboardId: Billboard[];
}
const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});
type CategoryFormValues = z.infer<typeof formSchema>;
export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category" : "Add a new category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const action = initialData ? "Save change" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      console.log("params:", params);

      const { storeId, categoryId } = await params;

      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${storeId}/categories/${categoryId}`, data);
      } else {
        await axios.post(`/api/${storeId}/categories`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);

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
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Category deleted!");
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using this category first."
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
          {" "}
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
                      placeholder="Categoy name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

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
