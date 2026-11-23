"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email atau password salah.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-milk-deep rounded-2xl p-8 shadow-sm border border-sand-light"
      >
        <h1 className="text-xl font-bold text-charcoal mb-1">Login Admin</h1>
        <p className="text-sm text-charcoal-light/70 mb-6">
          Gunakan kredensial admin untuk mengelola produk.
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-charcoal-light mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-white border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth/30 focus:border-earth/50"
              placeholder="admin@kainnusa.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-charcoal-light mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-white border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth/30 focus:border-earth/50"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-earth hover:bg-earth-dark disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-xs text-charcoal-light/50 mt-4">
          Default: <code className="bg-sand-light px-1 rounded">admin@kainnusa.com</code> /{" "}
          <code className="bg-sand-light px-1 rounded">admin123</code>
        </p>
      </motion.div>
    </div>
  );
}
