import { motion } from 'framer-motion';
import { Map, Phone } from 'lucide-react';

export default function LocationSection() {
  return (
    <section className="py-24 w-full relative z-10">
      <div className="max-w-4xl mx-auto px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-[2rem] p-8 md:p-16 relative overflow-hidden"
        >
          {/* Subtle map pattern background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} 
          />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center md:items-start justify-between">
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-display font-bold text-white mb-8 tracking-wide">
                LOCATE CARE ONE
              </h2>
              
              <div className="text-lg md:text-xl text-white/80 font-light leading-loose space-y-2">
                <p className="font-semibold text-white">CARE ONE PHARMACY</p>
                <p>Shop No. PL-012, BGH-A, Site-C</p>
                <p>Paramount GolfMart</p>
                <p>Below ICICI Bank, Opposite Sector Zeta</p>
                <p>Surajpur, Greater Noida — U.P. 201306</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto shrink-0">
              <a 
                href="https://maps.google.com/?q=Paramount+GolfMart+Surajpur+Greater+Noida"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-medium tracking-wide transition-all hover:scale-105"
              >
                <Map className="w-5 h-5 text-primary" />
                <span>Open Google Maps</span>
              </a>

              <a 
                href="tel:8826775758"
                className="group flex items-center justify-center gap-4 bg-transparent hover:bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-medium tracking-wide transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>Call Store</span>
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
