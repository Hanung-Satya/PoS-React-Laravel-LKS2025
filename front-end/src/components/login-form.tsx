import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import api from "@/lib/axios"

interface LoginResponse {
  status : string,
  token : string,
  message : string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [ loading, setLoading ] = useState(false);
  const [ formData, setFormData ] = useState({
    email : "",
    password : "",
  })
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await api.post<LoginResponse>('/login', formData);

      const data = res.data;
      const  token  = data.token;
      localStorage.setItem('auth_token', token)

      setFormData({
        email : "",
        password : "",
      })
      toast.success(data.message)
      console.log('Login Sukses')
      navigate('/products')
    } catch (error) {
      toast.error('Login Gagal : ' + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login to Your Account</CardTitle>
          <CardDescription>
            Enter your email and password to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email : e.target.value })
                  }}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input 
                id="password" 
                type="password"
                value={formData.password}
                  onChange={(e) => {
                    setFormData({...formData, password : e.target.value })
                  }}
                required />
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>{loading ? 'Loading' : 'Login'}</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
