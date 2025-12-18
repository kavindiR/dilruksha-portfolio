import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12 relative">
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      >
        <ArrowUp size={24} />
      </motion.button>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-gray-400">{personalInfo.title}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-1 text-gray-400 text-sm"
          >
            <span>Made with</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart size={16} className="text-red-500 fill-current" />
            </motion.div>
            <span>using React, Redux & Framer Motion</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-gray-500 text-sm"
          >
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
