"use client";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter();

  async function handleRegister(e) {
    setLoading(true)
    try {
      e.preventDefault();
      await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      router.push('/login')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }

  }
  return (
    <section
      className="flex justify-center items-center h-screen"
      onSubmit={handleRegister}
    >
      <FieldGroup className="border px-4 rounded-2xl w-90 pb-6">
        {/* Header */}
        <div className="text-center border-b py-2">
          <Link href="/" className="text-3xl font-semibold tracking-tight text-amber-600">
            Recalit
          </Link>
        </div>

        <form
          className="flex justify-center items-center flex-col gap-4"
          onSubmit={handleRegister}
        >

          {/* Name */}
          <Field className="max-w-sm">
            <FieldLabel htmlFor="fieldgroup-text">Name</FieldLabel>
            <Input
              id="fieldgroup-text"
              type="text"
              placeholder="ie. someone sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>

          {/* Email */}
          <Field className="max-w-sm">
            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
            <Input
              id="fieldgroup-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>

          {/* Password */}
          <Field className="max-w-sm">
            <FieldLabel htmlFor="inline-end-input">Password</FieldLabel>

            <InputGroup>
              <InputGroupInput
                id="inline-end-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </Field>

          {/* Actions */}
          <Field orientation="horizontal" className="flex flex-col gap-2">
            <Button disabled={loading} className="w-full">
              Register
              {loading && (
                <span className="p-1.5 border-t-2 rounded-full animate-spin"></span>
              )}
            </Button>

            <span className="text-sm py-2">
              Already have account?{" "}
              <Link href="/login" className="text-sm text-blue-500">Login</Link>
            </span>
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


        </div>
      </FieldGroup>
    </section>
  );
}
