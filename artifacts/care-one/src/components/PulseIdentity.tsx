import { motion } from 'framer-motion';

export default function PulseIdentity({ height = "h-32", isEnd = false }: { height?: string, isEnd?: boolean }) {
  return (
    <div className={`w-full ${height} flex items-center justify-center relative`}>
      <motion.div 
        className="w-[2px] h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-50"
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 0.5, scaleY: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      />
      
      {/* Moving pulse dot */}
      <motion.div 
        className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_3px_rgba(0,229,255,0.8)]"
        initial={{ top: "0%", opacity: 0 }}
        whileInView={{ top: isEnd ? "50%" : "100%", opacity: [0, 1, 1, 0] }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 2, ease: "easeInOut", times: [0, 0.2, 0.8, 1], repeat: Infinity, repeatDelay: 1 }}
      />

      {isEnd && (
        <motion.div
          className="absolute top-1/2 w-4 h-4 rounded-full border border-cyan-400/50 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </motion.div>
      )}
    </div>
  );
}
