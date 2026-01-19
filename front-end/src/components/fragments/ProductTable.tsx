import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Edit2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

interface Product {
  id: number;
  name: string;
  category_id: number;
  price: number;
  stock: number;
}

interface Props {
  products: Product[];
  refreshProduct: () => void;
}

export default function ProductTable({ products, refreshProduct }: Props) {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [formEditData, setFormEditData] = useState<Product>({
    id: 0,
    name: "",
    category_id: 0,
    price: 0,
    stock: 0,
  });

  function handleEdit(product: Product) {
    setFormEditData({
      id: product.id,
      name: product.name,
      category_id: product.category_id,
      price: product.price,
      stock: product.stock,
    });
    setIsDialogOpen(true);
  }

  function handleDelete(product: Product) {
    setFormEditData({
      id: product.id,
      name: product.name,
      category_id: product.category_id,
      price: product.price,
      stock: product.stock,
    });
    setIsAlertOpen(true);
  }

  async function updateProduct(e: React.FormEvent) {
    e.preventDefault();
    const id = formEditData.id;
    try {
      setLoading(true);
      const res = await api.put(`/products/${id}`, formEditData);

      const data = res.data;
      await refreshProduct();

      toast.success(data.message);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Gagal Mengupdate Produk : " + error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(e : React.FormEvent) {
    e.preventDefault();
    const id = formEditData.id;
    try {
      setLoading(true);
      const res = await api.delete(`/products/${id}`);

      const data = res.data;
      await refreshProduct();

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
            <TableHead>Name</TableHead>
            <TableHead>Category Id</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell className="font-semibold">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category_id}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell className="text-right">
                <Button
                  className="mr-1"
                  variant={"outline"}
                  onClick={() => {
                    handleEdit(product);
                  }}
                >
                  <Edit2 />
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    handleDelete(product);
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
        <DialogContent>
          <form onSubmit={updateProduct}>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Edit your Product here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 pt-2">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  value={formEditData.name}
                  onChange={(e) => {
                    setFormEditData({ ...formEditData, name: e.target.value });
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Category Id</Label>
                <Input
                  id="category"
                  name="category_id"
                  type="number"
                  value={formEditData.category_id}
                  onChange={(e) => {
                    setFormEditData({
                      ...formEditData,
                      category_id: Number(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formEditData.price}
                  onChange={(e) => {
                    setFormEditData({
                      ...formEditData,
                      price: Number(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formEditData.stock}
                  onChange={(e) => {
                    setFormEditData({
                      ...formEditData,
                      stock: Number(e.target.value),
                    });
                  }}
                />
              </div>
            </div>
            <DialogFooter className="pt-5">
              <DialogClose asChild>
                <Button variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Loading" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete and remove this product from database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProduct} disabled={loading}>{loading ? "Loading" : "Confirm"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
