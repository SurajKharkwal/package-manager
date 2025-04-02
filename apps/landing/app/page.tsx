export default function Home() {
  return (
    <div className="w-full min-h-dvh flex flex-col items-center">
      <section className="mt-40">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          The World Class Website to <br /> manage your shop
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Get the best advices from our experts, including expert artists,
          painters, marathon enthusiasts and RDX, totally free.
        </p>
      </section>
      <button className="text-2xl mt-8 cursor-pointer  border rounded-4xl py-2 px-4 bg-gradient-to-b from-neutral-900 to from-neutral-800 ">
        Quick Looks.
      </button>
    </div>
  );
}
