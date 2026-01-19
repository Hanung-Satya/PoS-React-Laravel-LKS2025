import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
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
import { Card, CardHeader, CardTitle} from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import { CartSidebar } from "@/components/cart-sidebar"

interface Product {
  id : number,
  name : string, 
  category_id : number,
  price : number,
  stock : number,
}
interface CartItem {
    id : number,
    name : string,
    price : number,
    qty : number
}

export default function PosPage() {
  const [ products, setProducts ] = useState<Product[]>([]);
  const [ cart, setCart ] = useState<CartItem[]>([]);
  const [ loading, setLoading ] = useState(false);

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

  function addToCart (product : Product) {
    setCart((previous) => {
        const exist = previous.find((item) => item.id === product.id)

        if (exist) {
            return previous.map((item) => (
                item.id === product.id ? {...item, qty : item.qty + 1} : item
            ))
        }

        return [
            ...previous,
            {
                id : product.id,
                name: product.name,
                price : product.price,
                qty : 1
            }
        ]
    })
  }

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
                  <BreadcrumbPage>Point of Sale</BreadcrumbPage>
                </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="ml-auto mr-2">
              <ModeToggle/>
            </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {loading ? (
              // <ProductLoading/>
              <p>Loading</p>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {products.map((product) => (
                    <Card className="max-w-xl" key={product.id}>
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                            <span className="text-sm">Stock : {product.stock}</span>
                        </CardHeader>
                            <div className="flex pl-5 pr-4 items-center justify-between">
                                <span className="font-semibold">{Number(product.price).toLocaleString('id-ID', {style:'currency', currency:'IDR', minimumFractionDigits:0,})}</span>
                                <Button variant={"outline"} onClick={() => addToCart(product)}>
                                    <ShoppingCart/>
                                </Button>
                            </div>
                    </Card>
                ))}
              </div>
            ) 
          }
        </div>
      </SidebarInset>
      <CartSidebar cart={cart} setCart={setCart}  refreshProduct={getProduct}/>
    </SidebarProvider>
      </>
    </ThemeProvider>
  )
}