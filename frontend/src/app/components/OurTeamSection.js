"use client";

import Image from "next/image";

const team = [
  {
    id: "rohit",
    name: "Rohit",
    description: "Full Stack AI developer",
    role: "Team Leader",
    image: "/rohit-pic.jpeg",
  },
  {
    id: "raja",
    name: "Raja Kumar",
    description: "Backend Developer",
    role: "Team Member",
    image: "/raja.jpeg",
  },
  {
    id: "jay",
    name: "Jay Prakash",
    description: "Full Stack Developer ",
    role: "Team Member",
    image: "/jay.jpg",
  },
];

export default function OurTeamSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 text-white" id="our-team">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6">Our Team</h2>
        <p className="text-zinc-400 text-lg leading-8 max-w-2xl mx-auto">
          Meet the people behind Full Stack + AI delivery.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {team.map((p) => (
          <div
            key={p.id}
            className="group relative rounded-[2rem] bg-white/[0.04] p-8 overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(600px circle at 10% 10%, rgba(59,130,246,0.20), transparent 50%), radial-gradient(500px circle at 90% 30%, rgba(168,85,247,0.18), transparent 45%)",
              }}
            />

            <div className="relative flex flex-col items-center text-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-zinc-800 ring-1 ring-white/10">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-6 font-bold text-2xl tracking-tight">{p.name}</div>
              <div className="text-zinc-400 text-sm mt-2">{p.role}</div>

              <div className="mt-6 text-zinc-300 leading-7 text-sm">
                {p.description}
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-zinc-400 ring-1 ring-white/10">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                Available for collaboration
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

