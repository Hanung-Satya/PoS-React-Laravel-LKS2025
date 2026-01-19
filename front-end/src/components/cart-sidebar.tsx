import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import api from "@/lib/axios";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface Props {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  refreshProduct : () => void
}

export function CartSidebar({ cart, setCart, refreshProduct}: Props) {
  const [loading, setLoading] = React.useState(false);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  async function confirmOrder() {
    if (cart.length === 0) {
      return toast.error("Cart Kosong");
    }

    const payload = {
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.qty,
      })),
    };

    try {
      setLoading(true);
      const res = await api.post("/sales", payload);

      const data = res.data;
      toast.success(data.message);

      setCart([]);
      refreshProduct()
    } catch (error) {
      toast.error("Gagal mengkonfirmasi pesanan : " + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sidebar
      collapsible="none"
      className="min-w-sm sticky top-0 h-svh lg:flex p-4"
    >
      <SidebarHeader>
        <h1 className="font-semibold text-2xl">Cart</h1>
      </SidebarHeader>
      <SidebarContent>
        {cart.map((item) => (
          <Item variant="outline" key={item.id}>
            <ItemContent>
              <ItemTitle>{item.name}</ItemTitle>
              <ItemDescription>
                {Number(item.price).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Input
                type="number"
                className="w-16"
                value={item.qty}
                onChange={(e) =>
                  setCart((previous) =>
                    previous.map((prevItem) =>
                      prevItem.id === item.id
                        ? { ...item, qty: Math.max(1, Number(e.target.value)) }
                        : prevItem
                    )
                  )
                }
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCart((previous) =>
                    previous.filter((prevItem) => prevItem.id !== item.id)
                  )
                }
              >
                <X />
              </Button>
            </ItemActions>
          </Item>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarContent>
          <SidebarSeparator className="mx-0" />
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <span>Total Price</span>
              <span>Rp {totalPrice}</span>
            </div>
          </div>
          <SidebarSeparator className="mx-0 mb-2" />
        </SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="w-full" onClick={confirmOrder}>
              {loading ? "Loading" : "Confirm Order"}
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
