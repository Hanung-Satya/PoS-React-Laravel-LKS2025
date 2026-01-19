import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import api from "@/lib/axios";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Profile {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
  });
  const nav = useNavigate();

  async function getProfile() {
    try {
      setLoading(true);
      const res = await api.get("/profile");

      const data = res.data;
      setProfile(data);
      toast.success("Data Berhasil Dimuat");
    } catch (error) {
      toast.error("Gagal Memuat Profile : " + error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {getProfile()}, [])

  async function handleLogout() {
    try {
      setLoading(true);
      const res = await api.post("/logout");

      const data = res.data;
      toast.success(data.data);
      nav('/login')
    } catch (error) {
      toast.error("Logout Gagal : " + error);
    } finally {
      setLoading(false);
    }
  }

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
                  <BreadcrumbPage>Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="ml-auto mr-2">
              <ModeToggle />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 items-center justify-center">
            <Card className="w-1/2">
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>
                  Detail of your account, click Logout button to logout
                </CardDescription>
                <SidebarSeparator className=" mx-auto" />
              </CardHeader>
              <CardContent>
                <form>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Label className="bg-muted p-2 rounded">{profile.name}</Label>
                    </Field>
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Label className="bg-muted p-2 rounded">{profile.email}</Label>
                    </Field>
                    <Field>
                      <Button onClick={handleLogout}>{loading ? 'Loading' : 'Logout'}</Button>
                    </Field>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
