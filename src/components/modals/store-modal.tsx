// "use cilent";

// import { useStoreModal } from "@/hooks/use-store-modal";
// import { Modal } from "@/components/ui/modal";
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// const formSchema = z.object({
//   name: z.string().min(1),
// });

// export const StoreModal = () => {
//   const storeModal = useStoreModal();

//   const [loading, setLoading] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//     },
//   });

//   const onSubmit = async (values:z.infer <typeof formSchema>) _=> {
//     try{
//       setLoading(true);
//       const response=await axios.post('/api/stores', values);
//       console.log(response.data);
//     }
//     catch(error)
//     {console.log(error);

//     }
//     finally{

//       setLoading(false);
//     }
//   }

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     //TODO create store
//     console.log(values);
//   };
//   return (
//     <div>
//       <Modal
//         title="Create store"
//         description="Add a new store to manage products and categories "
//         isOpen={storeModal.isOpen}
//         onClose={storeModal.onClose}
//       >
//         <div>
//           <div className="space-y-4 py-2 pb-4">
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)}>
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Nume</FormLabel>
//                       <FormControl>
//                         <Input
//                           disabled={loading}
//                           placeholder="E-comerce"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <div className="pt-6 space-x-2 flex items-center justify-end w-full">
//                   <Button
//                     disabled={loading}
//                     variant="outline"
//                     onClick={storeModal.onClose}
//                   >
//                     Cancel
//                   </Button>
//                   <Button disabled={loading} type="submit">
//                     Continue
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

///cod bun

// "use client";

// import { useStoreModal } from "@/hooks/use-store-modal";
// import { Modal } from "@/components/ui/modal";
// import * as z from "zod";
// import { toast } from "react-hot-toast";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import axios from "axios";

// const formSchema = z.object({
//   name: z.string().min(1),
// });

// export const StoreModal = () => {
//   const storeModal = useStoreModal();

//   const [loading, setLoading] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       setLoading(true);

//       const response = await axios.post("/api/stores", values);
//       toast.success("Magazin creat!");
//     } catch (error) {
//       toast.error("Ceva nu a mers bine!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Modal
//         title="Create store"
//         description="Add a new store to manage products and categories"
//         isOpen={storeModal.isOpen}
//         onClose={storeModal.onClose}
//       >
//         <div>
//           <div className="space-y-4 py-2 pb-4">
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)}>
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Nume</FormLabel>
//                       <FormControl>
//                         <Input
//                           disabled={loading}
//                           placeholder="E-comerce"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <div className="pt-6 space-x-2 flex items-center justify-end w-full">
//                   <Button
//                     disabled={loading}
//                     variant="outline"
//                     onClick={storeModal.onClose}
//                   >
//                     Cancel
//                   </Button>
//                   <Button disabled={loading} type="submit">
//                     Continue
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };
"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // 👈 AICI

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const router = useRouter(); // 👈 AICI

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values); // INSERT în DB
      toast.success("Magazin creat!");

      // 👇 EXACT CA ÎN VIDEO!!!!!!
      router.push(`/${response.data.id}`);

      storeModal.onClose(); // închide modalul (opțional)
    } catch (error) {
      toast.error("Ceva nu a mers bine!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nume</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="E-comerce"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                disabled={loading}
                variant="outline"
                onClick={storeModal.onClose}
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
