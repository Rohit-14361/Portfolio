export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28 text-white">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="uppercase tracking-[0.3em] text-blue-400 text-sm mb-5">
            Full Stack Developer
          </p>

          <h1 className="text-6xl lg:text-7xl font-black leading-tight">
            Building Modern
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Web Experiences
            </span>
          </h1>

          <p className="text-zinc-400 text-lg leading-8 mt-8">
            MERN Stack, Next.js, TypeScript, AWS Deployment,
            SEO, Google Ads & Analytics.
          </p>

          <div className="flex gap-5 mt-10">
            <a
              href="https://github.com"
              target="_blank"
              className="px-7 py-4 rounded-2xl bg-white text-black font-semibold"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              className="px-7 py-4 rounded-2xl border border-white/20"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
