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

          <a href="tel: 8826775158" className="relative z-10 block cursor-pointer group">
            <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-[4.5rem] font-display font-bold text-white tracking-tighter drop-shadow-[0_0_30px_rgba(0,229,255,0.4)] flex flex-wrap justify-center overflow-hidden py-4">
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
            href="https://wa.me/918826775158?text=Hello%20CARE%20ONE%2C%20I%20would%20like%20to%20enquire%20about%20medicines."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.675-2.066-.187-.305-.076-.472.131-.625.205-.156.511-.41.766-.615.255-.207.34-.344.511-.564.17-.22.085-.413-.042-.578-.127-.165-.1-.304-.219-.468-.118-.164-.635-1.582-.87-2.126-.228-.534-.457-.51-.766-.52-.198-.009-.426-.009-.654-.009-.228 0-.6.086-.914.431-.315.344-1.2 1.175-1.2 2.593 0 1.417.923 3.007 1.05 3.235.127.226 1.789 2.947 4.457 4.008 2.668 1.06 2.668.707 3.15.663.483-.044 1.559-.636 1.778-1.251.22-.614.22-1.142.154-1.251-.065-.109-.198-.172-.426-.301z" />
            </svg>
            or reach us on WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  );
}
