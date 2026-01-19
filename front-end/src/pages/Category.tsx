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
import CategoryTable from "@/components/fragments/CategoryTable"
import CategoryLoading from "@/components/fragments/CategoryLoading"

interface Categories {
  id : number,
  name : string, 
}

export default function CategoryPage() {
  const [ category, setCategory ] = useState<Categories[]>([]);
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

  async function createCategory(e: React.FormEvent) {
      e.preventDefault(); 
      try {
        setLoading(true)
        const res = await api.post('/categories', formData)

        const data = res.data;
        await getCategories();

        setIsDialogOpen(false)
        toast.success(data.message)
      } catch (error) {
        toast.error('Gagal menambahkan Category : ' + error)
      } finally {
        setLoading(false)
      }
  }

  async function getCategories() {
    try {
      setLoading(true);
      const res = await api.get('/categories');

      const data = res.data;
      setCategory(data.data);
      toast.success('Data Berhasil Dimuat')
    } catch(error) {
      toast.error('Gagal Memuat Data : ' + error)
    } finally {
      setLoading(false)
  }
  } 

  useEffect(() => {
    getCategories();
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
                  <BreadcrumbPage>Category</BreadcrumbPage>
                </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="ml-auto mr-2">
              <ModeToggle/>
            </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex justify-end">
            
            <Button variant={'secondary'} onClick={() => handleCreate()}>Add Category</Button>
          </div>
          {loading ? (
              // <ProductLoading/>
              <CategoryLoading/>
            ) : (
              <CategoryTable categories={category} refreshCategory={getCategories}/>
            ) 
          }
        </div>
      </SidebarInset>
    </SidebarProvider>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <form onSubmit={createCategory}>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Add Category here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" value={formData.name} onChange={(e) => {
                setFormProduct({...formData , name : e.target.value})
              }}/>
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