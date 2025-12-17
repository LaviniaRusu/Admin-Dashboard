// "use client";

// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal, Copy, Edit, Trash } from "lucide-react";
// import toast from "react-hot-toast";
// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import { AlertModal } from "@/components/modals/alert-modal";
// import { PharmaceuticalFormColumn } from "./columns";

// interface CellActionProps {
//   data: PharmaceuticalFormColumn;
// }

// export const CellAction: React.FC<CellActionProps> = ({ data }) => {
//   const router = useRouter();
//   const params = useParams();
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const onCopy = (id: string) => {
//     navigator.clipboard.writeText(id);
//     toast.success("ID-ul formei farmaceutice a fost copiat.");
//   };

//   const onDelete = async () => {
//     try {
//       setLoading(true);

//       await axios.delete(
//         `/api/${params.storeId}/pharmaceutical-form/${data.id}`
//       );

//       router.refresh();
//       toast.success("Forma farmaceutică a fost ștearsă.");
//     } catch (error) {
//       toast.error(
//         "Nu poți șterge forma farmaceutică deoarece există produse asociate."
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

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent align="end">
//           <DropdownMenuLabel>Acțiuni</DropdownMenuLabel>

//           <DropdownMenuItem onClick={() => onCopy(data.id)}>
//             <Copy className="mr-2 h-4 w-4" />
//             Copiază ID
//           </DropdownMenuItem>

//           <DropdownMenuItem
//             onClick={() =>
//               router.push(`/${params.storeId}/pharmaceutical-form/${data.id}`)
//             }
//           >
//             <Edit className="mr-2 h-4 w-4" />
//             Editează
//           </DropdownMenuItem>

//           <DropdownMenuItem onClick={() => setOpen(true)}>
//             <Trash className="mr-2 h-4 w-4" />
//             Șterge
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   );
// };

// export default CellAction;
"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Copy, Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import { PharmaceuticalFormColumn } from "./columns";

interface CellActionProps {
  data: PharmaceuticalFormColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams() as { storeId: string };

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (pharmaceuticalFormId: string) => {
    navigator.clipboard.writeText(pharmaceuticalFormId);
    toast.success("ID-ul formei farmaceutice a fost copiat.");
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `/api/${params.storeId}/pharmaceutical-form/${data.id}`
      );

      router.refresh();
      toast.success("Forma farmaceutică a fost ștearsă.");
    } catch (error) {
      toast.error(
        "Nu poți șterge forma farmaceutică deoarece există produse asociate."
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acțiuni</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copiază ID
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/pharmaceutical-form/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Editează
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Șterge
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
