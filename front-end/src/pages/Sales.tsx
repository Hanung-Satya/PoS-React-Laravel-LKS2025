import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SalesTable from "@/components/fragments/SalesTable";
import SalesLoading from "@/components/fragments/SalesLoading";

interface Sales {
  id: number;
  user_id: number;
  total_price: number;
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sales[]>([]);
  const [loading, setLoading] = useState(false);

  async function getSales() {
    try {
      setLoading(true);
      const res = await api.get("/sales");

      const data = res.data;
      setSales(data.data);
      toast.success("Data Berhasil Dimuat");
    } catch (error) {
      toast.error("Gagal Memuat Data : " + error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSales();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b">
              <div className="flex items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Sales</BreadcrumbPage>
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
              <div className="ml-auto mr-2">
                <ModeToggle />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              {loading ? (
                <SalesLoading/>
              ) : (
                <SalesTable sales={sales} refreshSales={getSales} />
              )}
            </div>
          </SidebarInset>
        </SidebarProvider>
    </ThemeProvider>
  );
}
