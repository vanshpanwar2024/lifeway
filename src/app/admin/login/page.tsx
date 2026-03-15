"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-cream-200">
        <div className="text-center mb-8">
          <div className="w-20 h-20 relative mx-auto mb-4">
            <Image src="/images/Colorful_Logo_icon_vector_transparent_bg.png" alt="Lifeway Logo" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-cream-900 tracking-tight">Admin Gateway</h1>
          <p className="text-sm text-cream-500 mt-2">Sign in to manage Lifeway properties</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 text-center font-medium">
              {error}
            </div>
          )}
          
          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Username</label>
            <input
              name="username"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm text-cream-900 transition-all"
            />
          </div>
          
          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm text-cream-900 transition-all"
            />
          </div>

          <Button variant="primary" className="w-full h-12" type="submit" disabled={loading}>
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
