import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import api from "@/lib/axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import ProductTable from "@/components/fragments/ProductTable"
import ProductLoading from "@/components/fragments/ProductLoading"

interface Products {
  id : number,
  name : string, 
  category_id : number,
  price : number,
  stock : number,
}

export default function ProductPage() {
  const [ products, setProducts ] = useState<Products[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ isDialogOpen, setIsDialogOpen] = useState(false)
  const [ formData, setFormProduct  ] = useState({
    name : "",
    category_id : "",
    price : "",
    stock : "",
  });

  function handleCreate() {
    setIsDialogOpen(true)
  }

  async function createProduct(e: React.FormEvent) {
      e.preventDefault(); 
      try {
        setLoading(true)
        const res = await api.post('/products', formData)

        const data = res.data;
        await getProduct();

        setIsDialogOpen(false)
        toast.success(data.message)
      } catch (error) {
        toast.error('Gagal menambahkan product : ' + error)
      } finally {
        setLoading(false)
      }
  }

  async function getProduct() {
    try {
      setLoading(true);
      const res = await api.get('/products');

      const data = res.data;
      setProducts(data.data);
      toast.success('Data Berhasil Dimuat')
    } catch(error) {
      toast.error('Gagal Memuat Product : ' + error)
    } finally {
      setLoading(false)
  }
  } 

  useEffect(() => {
    getProduct();
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbPage>Product</BreadcrumbPage>
                </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="ml-auto mr-2">
              <ModeToggle/>
            </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex justify-end">
            
            <Button variant={'secondary'} onClick={() => handleCreate()}>Add Product</Button>
          </div>
          {loading ? (
              // <ProductLoading/>
              <ProductLoading/>
            ) : (
              <ProductTable products={products} refreshProduct={getProduct}/>
            ) 
          }
        </div>
      </SidebarInset>
    </SidebarProvider>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <form onSubmit={createProduct}>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Add Product here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 pt-2">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" value={formData.name} onChange={(e) => {
                setFormProduct({...formData , name : e.target.value})
              }}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category Id</Label>
              <Input id="category" name="category_id" type="number" value={formData.category_id} onChange={(e) => {
                setFormProduct({...formData , category_id : e.target.value})
              }}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" value={formData.price} onChange={(e) => {
                setFormProduct({...formData , price : e.target.value})
              }}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" name="stock" type="number" value={formData.stock} onChange={(e) => {
                setFormProduct({...formData , stock : e.target.value})
              }}/>
            </div>
          </div>
          <DialogFooter className="pt-5">
            <DialogClose asChild>
              <Button variant="outline" disabled={loading}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>{loading ? 'Loading' : 'Confirm'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
      </>
    </ThemeProvider>
  )
}