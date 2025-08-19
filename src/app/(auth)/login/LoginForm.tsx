"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, EyeClosed, EyeIcon } from "lucide-react";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import LoadingBtn from "@/components/shared/LoadingBtn";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const [isVisible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString().trim() || "";

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");

    startTransition(async () => {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.ok) {
        toast.success("Logged in successfully.");
        setTimeout(() => {
          router.push("/blogs");
        }, 100)
      }

      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center">
      <form
        onSubmit={submitForm}
        className="space-y-5 border-2 rounded-lg shadow p-3"
      >
        <Link href={"/"} className="flex items-center">
          <ArrowLeft className="size-5" />{" "}
          <span className="hover:underline">Go back home</span>
        </Link>

        <h1 className="text-2xl text-center">Login Yourself</h1>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          disabled={isPending}
        />

        <div className="relative space-y-1">
          <Input
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            disabled={isPending}
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setVisible(!isVisible)}
            className="absolute top-1.5 right-3"
          >
            {isVisible ? <EyeIcon /> : <EyeClosed />}
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-xs text-center tracking-widest">
            {error}
          </div>
        )}

        <LoadingBtn loading={isPending} type="submit" className="w-full">
          Submit
        </LoadingBtn>

        {/* Or Divider */}
        <div className="flex gap-2 items-center">
          <div className="w-1/2 border-2"></div>
          <span className="px-2">Or</span>
          <div className="w-1/2 border-2"></div>
        </div>

        {/* Google and GitHub Login */}
        <Button
          className="w-full tracking-wider border-x-0"
          variant="outline"
          onClick={() =>
            signIn("google", {
              redirect: true,
              callbackUrl: "/blogs?success=true",
            })
          }
        >
          Login with Google <FcGoogle className="ml-2" />
        </Button>
        <Button
          className="w-full tracking-wider border-x-0"
          variant="outline"
          onClick={() =>
            signIn("github", {
              redirect: true,
              callbackUrl: "/blogs?success=true",
            })
          }
        >
          Login with GitHub <FaGithub className="ml-2" />
        </Button>

        <p className="text-center">
          Want to create an Account?{" "}
          <Link href={"/signup"} className="hover:underline text-primary font-semibold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
