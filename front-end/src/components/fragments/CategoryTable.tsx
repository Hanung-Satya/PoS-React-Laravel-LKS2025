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

interface Category {
  id: number,
  name: string,
  
}

interface Props {
  categories: Category[];
  refreshCategory: () => void;
}

export default function CategoryTable({ categories, refreshCategory }: Props) {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [formEditData, setFormEditData] = useState<Category>({
    id: 0,
    name: "",
  });

  function handleEdit(category: Category) {
    setFormEditData({
      id: category.id,
      name: category.name,
    });
    setIsDialogOpen(true);
  }

  function handleDelete(category: Category) {
    setFormEditData({
      id: category.id,
      name: category.name,
    });
    setIsAlertOpen(true);
  }

  async function updateProduct(e: React.FormEvent) {
    e.preventDefault();
    const id = formEditData.id;
    try {
      setLoading(true);
      const res = await api.put(`/categories/${id}`, formEditData);

      const data = res.data;
      await refreshCategory();

      toast.success(data.message);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Gagal Mengupdate Category : " + error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(e : React.FormEvent) {
    e.preventDefault();
    const id = formEditData.id;
    try {
      setLoading(true);
      const res = await api.delete(`/categories/${id}`);

      const data = res.data;
      await refreshCategory();

      toast.success(data.message);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Gagal Menghapus Category : " + error);
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
            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category: Category) => (
            <TableRow key={category.id}>
              <TableCell className="font-semibold">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="text-right">
                <Button
                  className="mr-1"
                  variant={"outline"}
                  onClick={() => {
                    handleEdit(category);
                  }}
                >
                  <Edit2 />
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    handleDelete(category);
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
              This action cannot be undone. This will permanently delete and remove this category from database.
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
