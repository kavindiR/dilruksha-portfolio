import { motion } from 'framer-motion';
import { Mail, Linkedin, Phone, Download, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const handleScrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={item} className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 p-1 shadow-2xl"
            >
              <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-4xl sm:text-5xl font-bold text-blue-600 dark:text-cyan-400">
                {personalInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.div variants={item} className="mb-8">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {personalInfo.title}
            </motion.h2>
          </motion.div>

          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {personalInfo.summary}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Mail size={20} />
              <span>Contact Me</span>
            </motion.a>

            <motion.a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </motion.a>

            <motion.a
              href={`tel:${personalInfo.phone}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Phone size={20} />
              <span className="hidden sm:inline">{personalInfo.phone}</span>
              <span className="sm:hidden">Call</span>
            </motion.a>
          </motion.div>

          <motion.button
            variants={item}
            onClick={handleScrollToAbout}
            className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown className="text-gray-600 dark:text-gray-300" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
