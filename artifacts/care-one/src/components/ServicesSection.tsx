import { motion } from 'framer-motion';

const cards = [
  {
    id: 1,
    title: "Medicine",
    color: "bg-blue-500",
    gradient: "from-blue-500/20 to-transparent",
    illustration: (
      <div className="relative w-32 h-32 transform-gpu preserve-3d">
        <div className="absolute inset-x-0 bottom-4 h-2 bg-white/20 rounded-full" />
        <div className="absolute inset-x-0 top-1/2 h-2 bg-white/20 rounded-full" />
        <div className="absolute left-4 bottom-4 w-6 h-12 bg-orange-400 rounded-sm shadow-lg" />
        <div className="absolute left-14 bottom-4 w-8 h-10 bg-cyan-400 rounded-sm shadow-lg" />
        <div className="absolute right-4 bottom-4 w-6 h-14 bg-blue-400 rounded-sm shadow-lg" />
        <div className="absolute left-8 top-6 w-10 h-8 bg-emerald-400 rounded-sm shadow-lg" />
      </div>
    ),
    description: "Complete range of authentic prescription and over-the-counter medicines."
  },
  {
    id: 2,
    title: "Cosmetics",
    color: "bg-amber-400",
    gradient: "from-amber-400/20 to-transparent",
    illustration: (
      <div className="relative w-32 h-32 flex items-end justify-center pb-4">
        <div className="relative w-16 h-20 bg-pink-200 rounded-t-3xl rounded-b-xl shadow-lg flex flex-col items-center">
          <div className="absolute -top-6 w-10 h-6 bg-yellow-600 rounded-t-md" />
          <div className="w-full h-full bg-gradient-to-tr from-white/10 to-transparent" />
        </div>
      </div>
    ),
    description: "Premium skincare, derma products, and luxury cosmetics."
  },
  {
    id: 3,
    title: "Supplements",
    color: "bg-emerald-400",
    gradient: "from-emerald-400/20 to-transparent",
    illustration: (
      <div className="relative w-32 h-32 flex items-end justify-center pb-4">
        <div className="relative w-20 h-24 bg-zinc-800 rounded-xl shadow-lg border-2 border-zinc-700">
          <div className="absolute -top-4 left-1 w-18 h-4 bg-zinc-900 rounded-t-lg" />
          <div className="absolute top-4 left-2 right-2 h-10 bg-emerald-500/20 rounded flex items-center justify-center">
             <div className="w-6 h-6 rounded-full bg-emerald-500/50" />
          </div>
        </div>
      </div>
    ),
    description: "High-quality vitamins, proteins, and daily nutritional supplements."
  },
  {
    id: 4,
    title: "Clinical Care",
    color: "bg-cyan-400",
    gradient: "from-cyan-400/20 to-transparent",
    illustration: (
      <div className="relative w-32 h-32 flex items-center justify-center rotate-45">
        <div className="relative w-24 h-6 bg-white/90 rounded-full shadow-lg flex items-center">
          <div className="absolute -left-4 w-4 h-1 bg-zinc-400" />
          <div className="absolute right-0 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
             <div className="w-6 h-6 bg-cyan-500 rounded-full" />
          </div>
          <div className="ml-4 w-8 h-2 bg-cyan-200/50 rounded-full" />
        </div>
      </div>
    ),
    description: "First-aid, surgical items, and essential home medical equipment."
  }
];

export default function ServicesSection() {
  return (
    <section className="py-24 w-full relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
          >
            Premium Care Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/50"
          >
            Hover or tap to explore
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group perspective w-full h-[360px]"
            >
              <div className="relative w-full h-full preserve-3d transition-transform duration-700 ease-out group-hover:rotate-y-180 cursor-pointer">
                
                {/* Front Face */}
                <div className="absolute w-full h-full backface-hidden glass-panel rounded-3xl p-8 flex flex-col items-center justify-between border-t border-white/20">
                  <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} opacity-20 rounded-3xl pointer-events-none`} />
                  
                  <div className="flex-1 flex items-center justify-center">
                    {card.illustration}
                  </div>
                  
                  <div className="text-center relative z-10">
                    <h3 className="text-2xl font-display font-semibold text-white mb-2">{card.title}</h3>
                    <p className="text-xs tracking-widest text-white/40 font-semibold">TAP FOR MORE INFO</p>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#0a0f25] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                  <div className={`w-16 h-1 rounded-full ${card.color} mb-8`} />
                  <h3 className="text-2xl font-display font-semibold text-white mb-4">{card.title}</h3>
                  <p className="text-lg text-white/70 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
}
