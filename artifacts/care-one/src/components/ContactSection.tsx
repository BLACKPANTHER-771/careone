import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import RippleButton from './RippleButton';

export default function ContactSection() {
  const numberStr = "8826775158";
  
  return (
    <section className="py-32 w-full relative min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center w-full relative z-10">
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-white/40 tracking-[0.4em] uppercase mb-12"
        >
          CONNECT
        </motion.p>

        <div className="relative flex items-center justify-center w-full mb-16">
          {/* Concentric pulsing rings behind text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {[0, 1, 2].map((i) => (
              <motion.div 
                key={`ring-${i}`}
                className="absolute w-[200px] h-[200px] rounded-full border border-cyan-400/30"
                animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                transition={{ duration: 3, delay: i * 1, repeat: Infinity, ease: "easeOut" }}
              />
            ))}
          </div>

          <a href="tel:8826775758" className="relative z-10 block cursor-pointer group">
            <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] font-display font-bold text-white tracking-tighter drop-shadow-[0_0_30px_rgba(0,229,255,0.4)] flex overflow-hidden py-4">
              {numberStr.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                  className="inline-block group-hover:text-cyan-400 transition-colors duration-300"
                >
                  {char}
                </motion.span>
              ))}
            </h2>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-sm flex flex-col items-center gap-6"
        >
          <RippleButton 
            href="tel:8826775158"
            className="w-full inline-flex items-center justify-center gap-3 bg-cyan-400 text-black px-12 py-5 rounded-2xl font-bold text-lg tracking-widest shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_50px_rgba(0,229,255,0.6)] transition-all hover:scale-[1.02]"
          >
            <Phone className="w-5 h-5 relative z-10" />
            <span className="relative z-10">CALL NOW</span>
          </RippleButton>
          
          <a 
            href="https://wa.me/918826775758?text=Hello%20CARE%20ONE%2C%20I%20would%20like%20to%20enquire%20about%20medicines."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .104 5.383.101 11.936c0 2.098.546 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.947-5.383 11.949-11.936a11.822 11.822 0 0 0-3.535-8.455"/>
            </svg>
            or reach us on WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  );
}
