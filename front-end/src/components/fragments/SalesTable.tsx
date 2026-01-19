import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Eye, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

interface Sale {
  id: number;
  user_id: number;
  total_price: number;
}

interface Details {
  id: number;
  sale_id: number;
  product_id: number;
  quantity: number;
  subtotal: number;
}

interface Props {
  sales: Sale[];
  refreshSales: () => void;
}

export default function SalesTable({ sales, refreshSales }: Props) {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [sale, setSaleData] = useState<Sale>({
    id: 0,
    user_id: 0,
    total_price: 0,
  });
  const [details, setDetails] = useState<Details[]>([]);

  function handleDetails(sales: Sale) {
    setIsDialogOpen(true);
    getDetails(sales);
  }

  async function getDetails(sales: Sale) {
    const id = sales.id;
    try {
      setLoading(true);
      const res = await api.get(`/sales-details/${id}`);

      const data = res.data;
      setDetails(data.data);
      toast.success("Data Berhasil Dimuat");
    } catch (error) {
      toast.error("Gagal Memuat Data : " + error);
    } finally {
      setLoading(false);
    }
  }

  function handleDelete(sale: Sale) {
    setSaleData({
      id: sale.id,
      user_id: sale.user_id,
      total_price: sale.total_price,
    });
    setIsAlertOpen(true);
  }

  async function deleteProduct(e: React.FormEvent) {
    e.preventDefault();
    const id = sale.id;
    try {
      setLoading(true);
      const res = await api.delete(`/sales/${id}`);

      const data = res.data;
      await refreshSales();

      toast.success(data.message);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Gagal Mengupdate Produk : " + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>User Id</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale: Sale) => (
            <TableRow key={sale.id}>
              <TableCell className="font-semibold">{sale.id}</TableCell>
              <TableCell>{sale.user_id}</TableCell>
              <TableCell>{sale.total_price}</TableCell>
              <TableCell className="text-right">
                <Button
                  className="mr-1"
                  variant={"outline"}
                  onClick={() => {
                    handleDetails(sale);
                  }}
                >
                  <Eye />
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    handleDelete(sale);
                  }}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sales Details</DialogTitle>
            <DialogDescription>View the details of sales</DialogDescription>
          </DialogHeader>
          <ScrollArea>
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead>Sale Id</TableHead>
                  <TableHead>Product Id</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {details.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.sale_id}</TableCell>
                    <TableCell>{item.product_id}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>Rp. {item.subtotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <DialogFooter className="pt-5">
            <DialogClose asChild>
              <Button variant="outline" disabled={loading}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete and
              remove this product from database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProduct} disabled={loading}>
              {loading ? "Loading" : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
