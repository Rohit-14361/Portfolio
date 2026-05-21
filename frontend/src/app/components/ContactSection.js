"use client";

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-white">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left */}
        <div>
          <h2 className="text-5xl font-black leading-tight">
            Let&apos;s Work Together
          </h2>

          <p className="text-zinc-400 mt-8 text-lg leading-8">
            Available for freelance projects, internships, startups, SEO
            optimization, AWS deployment, and full-stack development.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { icon: "⚡", label: "Fast Response", desc: "Typically within 24–48 hours" },
              { icon: "🔒", label: "Confidential", desc: "Your details are safe with me" },
              { icon: "🌍", label: "Remote-Friendly", desc: "Available worldwide" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <div className="font-semibold">{item.label}</div>
                  <div className="text-sm text-zinc-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – Form */}
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center h-full py-10 text-center space-y-4">
              <div className="text-6xl">🎉</div>
              <h3 className="text-2xl font-bold">Message Sent!</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Thank you for reaching out. I&apos;ve received your message and will
                get back to you within 24–48 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Project Details or Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition resize-none"
                />
              </div>

              {status === "error" && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-2xl bg-white text-black py-4 font-semibold hover:bg-zinc-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}