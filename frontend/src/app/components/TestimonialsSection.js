"use client";

import Image from "next/image";

const defaultTestimonials = [
  {
    id: "rohit",
    name: "Rohit",
    role: "Team Leader",
    rating: 5,
    message:
      "Built modern, scalable MERN experiences. Always focused on clean UX and reliable backend architecture.",
    image: "/rohit-pic.jpeg",
  },
  {
    id: "raja",
    name: "Raja",
    role: "Team Member",
    rating: 5,
    message:
      "Great at turning requirements into working features quickly. Delivers polished UI and strong API integration.",
    image: "/raja-pic.jpeg",
  },
  {
    id: "jay",
    name: "Jay",
    role: "Team Member",
    rating: 5,
    message:
      "Committed to quality. Reviews details carefully and ensures smooth performance across devices.",
    image: "/jay.jpg",
  },
];

function Stars({ rating = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < rating;
        return (
          <span key={i} className={on ? "text-yellow-400" : "text-white/20"}>
            ★
          </span>
        );
      })}
    </div>
  );
}

export default function TestimonialsSection({ dynamicTestimonials = [] }) {
  const merged = [...defaultTestimonials, ...dynamicTestimonials];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 text-white" id="our-team">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6">Our Team</h2>
        <p className="text-zinc-400 text-lg leading-8 max-w-2xl mx-auto">
          Meet the team behind the work.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {merged.map((t) => (

          <div
            key={t.id || t._id || t.name}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 bg-zinc-800">
                {t.image ? (
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                )}
              </div>
              <div>
                <div className="font-bold text-xl">{t.role === "Team Leader" ? "Rohit" : (t.name || "Team Member")}</div>
                <div className="text-zinc-400 text-sm">{t.role || (t.role === "Team Leader" ? "Team Leader" : "Team Member")}</div>

              </div>

            </div>


            <div className="mt-5">
              <Stars rating={t.rating || 5} />
            </div>

            <p className="text-zinc-300 leading-7 mt-6 text-sm">
              “{t.message}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

