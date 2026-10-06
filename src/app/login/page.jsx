"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "@/context/authContext";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export default function Login() {
  const { setIsLoggedIn } = useAuth()

  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleLogin(e) {
    try {
      setLoading(true)
      e.preventDefault();
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem('userData', JSON.stringify(result.userData))
        setIsLoggedIn(true)
        router.push("/dashboard");
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.log(data)
      console.error(err); 
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="flex justify-center items-center h-screen m-1">
      <FieldGroup className="border px-4 rounded-2xl w-90 pb-6">
        {/* Header */}
        <div className="text-center border-b py-2">
          <Link href="/" className="text-3xl font-semibold tracking-tight text-amber-600">
            Recalit
          </Link>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4 py-1" onSubmit={handleLogin}>
          <Field className="max-w-sm">
            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
            <Input
              id="fieldgroup-email"
              type="email"
              placeholder="name@example.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </Field>

          <Field className="max-w-sm">
            <FieldLabel htmlFor="inline-end-input">Password</FieldLabel>

            <InputGroup>
              <InputGroupInput
                id="inline-end-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={data.password}
                onChange={(e) =>
                  setData({ ...data, password: e.target.value })
                }
                required
              />

              <InputGroupAddon
                align="inline-end"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </InputGroupAddon>
            </InputGroup>

            <span className="text-[13px] text-red-500">{error}</span>

          </Field>

          <Field orientation="horizontal" className="flex flex-col w-full">
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              Login
              {loading && (
                <span className="p-1.5 border-t-2 rounded-full animate-spin"></span>
              )}
            </Button>
            <div>
              <span className="text-sm">create an account? </span>{" "}
              <Link href="/register" className="text-blue-500 text-sm">register</Link>
            </div>

          </Field>

        </form>

        {/* Footer */}
        <div className="flex flex-col justify-center items-center border-t py-6 w-full gap-3">
          <Button className="border border-gray-400 bg-background text-foreground w-full">
            <FcGoogle className="mr-2 text-xl" />Sign in with Google
          </Button>
          <Button className="border border-gray-400 bg-background text-foreground w-full">
            <FaFacebook className="mr-2 text-xl" />Sign in with Facebook
          </Button>

          <Link
            href="#"
            className="text-sm text-blue-500 text-nowrap hover:underline"
          >
            Forget Password?
          </Link>
        </div>
      </FieldGroup>
    </section>
  );
}
