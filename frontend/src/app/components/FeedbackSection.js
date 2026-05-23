"use client";




import { useEffect, useState } from "react";

import api from "../../utils/axios";

export default function FeedbackSection() {

  const [form, setForm] = useState({ name: "", role: "", message: "", rating: 5 });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // No-op: keep for future (e.g., prefetching)
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const payload = {
        name: form.name.trim(),
        role: form.role.trim() || "Team Member",
        message: form.message.trim(),
        rating: Number(form.rating),
      };


      const res = await api.post("/feedback", payload);

      if (!res?.data) throw new Error("Invalid response");

      setStatus("success");
      setForm({ name: "", role: "", message: "", rating: 5 });

      // (optional) you can fetch latest feedback here if you want to render it elsewhere

    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.response?.data?.message || err.message || "Something went wrong");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-8 text-white">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-5xl font-black leading-tight">Leave Feedback</h2>
          <p className="text-zinc-400 mt-6 text-lg leading-8">
            Share what you think. Your feedback will appear instantly on this page.
          </p>
          <div className="mt-8 text-sm text-zinc-500 leading-7">
            Tip: Keep it short and specific (what was good, what improved, results).
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          {status === "success" && (
            <div className="flex flex-col items-center justify-center text-center h-full py-10 space-y-4">
              <div className="text-6xl">🌟</div>
              <div className="text-2xl font-bold">Thanks! Feedback submitted</div>
              <div className="text-zinc-400 text-sm">
                It should show up in the Testimonials section right away.
              </div>
            </div>
          )}

          {status !== "success" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="role"
                  placeholder="Role (optional)"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition"
                />
              </div>

              <div>
                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white focus:outline-none focus:border-white/30 transition"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your feedback"
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
                {status === "loading" ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

