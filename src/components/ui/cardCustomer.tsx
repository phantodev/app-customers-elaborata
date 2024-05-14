import { ICustomer } from "@/interfaces/Customers";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { Pencil as PencilIcon, Trash2 as BinIcon } from "lucide-react";
import { cn } from "@/lib/utils";
// import { useStore } from "@/stores";
// import { useRouter } from "next/navigation";

interface ICardCustomerProps {
  customer: ICustomer;
  className?: string;
  inactive: string;
  handleUpdateCustomer: (customer: ICustomer) => void;
  handleOpenDialog: (idCustomer: number) => void;
}

export default function CardCustomer(props: ICardCustomerProps) {
  // const router = useRouter();
  // const store = useStore();

  // function handleUpdateCustomer(customer: ICustomer) {
  //   store.setCustomerToUpdate(customer);
  //   router.push("/dashboard/customers/add");
  // }

  return (
    <Card
      className={cn(
        props.inactive === "true" ? "!border-red-500" : "",
        props.className,
        "relative w-full border border-primary/15 p-4"
      )}>
      {props.inactive === "true" && (
        <section className="absolute top-4 right-4 bg-red-500 text-xs text-white rounded-md px-3 py-1">
          Inativo
        </section>
      )}
      <CardHeader className="flex gap-3 items-center pb-4">
        <Image
          alt="nextui logo"
          height={50}
          radius="sm"
          className="!opacity-100"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{props.customer.name}</p>
          <p className="text-small text-default-500">{props.customer.email}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="py-4 !flex !flex-row !justify-between !text-sm">
        <section>CPF: {props.customer.cpf}</section>{" "}
        <section>
          Cidade/UF: {props.customer.city + "/" + props.customer.state}
        </section>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-end pt-4 gap-4">
        <button onClick={() => props.handleUpdateCustomer(props.customer)}>
          <PencilIcon />
        </button>
        <button onClick={() => props.handleOpenDialog(props.customer.id)}>
          <BinIcon />
        </button>
      </CardFooter>
    </Card>
  );
}
