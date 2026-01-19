import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

export default function CategoryLoading() {
    return (
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
              <TableCell ><Skeleton className="h-[40px] w-full"></Skeleton></TableCell>
              <TableCell ><Skeleton className="h-[40px] w-full"></Skeleton></TableCell>
              <TableCell className=" flex justify-end"><Skeleton className="h-[40px] w-[90px]"></Skeleton></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    )
}