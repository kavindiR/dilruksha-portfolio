import { motion } from 'framer-motion';
import { ArrowUp, Linkedin, Mail, Phone, Code, Briefcase, Database } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

// Animation variants for footer
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

const scrollButtonVariants = {
  hidden: { opacity: 0, scale: 0, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay: 0.3,
    },
  },
  hover: {
    scale: 1.1,
    y: -4,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay: 0.1 + index * 0.05,
    },
  }),
  hover: {
    x: 5,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

const expertiseItemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay: 0.15 + index * 0.04,
    },
  }),
};

const contactItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay: 0.2 + index * 0.06,
    },
  }),
  hover: {
    x: 5,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 18,
      delay: 0.3 + index * 0.08,
    },
  }),
  hover: {
    scale: 1.15,
    y: -3,
    rotate: 5,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17,
    },
  },
  tap: {
    scale: 0.9,
  },
};

const bottomBarVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      delay: 0.5,
    },
  },
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className="relative bg-black text-white border-t border-cyber-blue-500/30"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyber-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyber-blue-600/5 rounded-full blur-3xl" />
      </div>

      {/* Scroll to top button container */}
      <div className="relative -mt-8 mb-8 flex justify-center">
        <motion.button
          onClick={scrollToTop}
          variants={scrollButtonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover="hover"
          whileTap="tap"
          className="relative w-14 h-14 bg-gradient-to-br from-cyber-blue-500 to-cyber-blue-700 rounded-full shadow-cyber-blue hover:shadow-cyber-blue-lg transition-all duration-300 flex items-center justify-center text-white z-20 border-4 border-black"
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowUp size={24} />
          </motion.div>
        </motion.button>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1"
          >
            <div className="mb-4">
              <motion.h3
                className="text-2xl font-bold bg-gradient-to-r from-cyber-blue-500 via-cyber-blue-400 to-cyber-blue-600 bg-clip-text text-transparent text-glow-blue-sm mb-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {personalInfo.name.split(' ')[0]}
              </motion.h3>
              <h4 className="text-xl font-semibold text-white">
                {personalInfo.name.split(' ')[1]}
              </h4>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {personalInfo.title}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming data into strategic business value through innovative engineering solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="w-full"
          >
            <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Code className="mr-2 text-cyber-blue-500" size={20} />
              Quick Links
            </h5>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  variants={linkVariants}
                  custom={index}
                  whileHover="hover"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-gray-400 hover:text-cyber-blue-500 transition-colors duration-300 text-sm font-medium"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Expertise */}
          <motion.div
            variants={itemVariants}
            className="w-full"
          >
            <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Briefcase className="mr-2 text-cyber-blue-500" size={20} />
              Expertise
            </h5>
            <ul className="flex flex-col space-y-2">
              {[
                'Data Engineering',
                'Cloud Platforms',
                'Data Pipelines',
                'ML/AI Integration',
                'Data Architecture',
                'ETL/ELT Processes',
              ].map((expertise, index) => (
                <motion.li
                  key={expertise}
                  variants={expertiseItemVariants}
                  custom={index}
                  className="text-gray-400 text-sm flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <span className="w-1.5 h-1.5 bg-cyber-blue-500 rounded-full mr-2" />
                  {expertise}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="w-full"
          >
            <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Database className="mr-2 text-cyber-blue-500" size={20} />
              Get In Touch
            </h5>
            <div className="space-y-3">
              <motion.a
                href={`mailto:${personalInfo.email}`}
                variants={contactItemVariants}
                custom={0}
                whileHover="hover"
                className="flex items-center space-x-3 text-gray-400 hover:text-cyber-blue-500 transition-colors duration-300 text-sm group"
              >
                <Mail size={16} className="text-cyber-blue-500 group-hover:scale-110 transition-transform" />
                <span className="break-all">{personalInfo.email}</span>
              </motion.a>
              <motion.a
                href={`tel:${personalInfo.phone}`}
                variants={contactItemVariants}
                custom={1}
                whileHover="hover"
                className="flex items-center space-x-3 text-gray-400 hover:text-cyber-blue-500 transition-colors duration-300 text-sm group"
              >
                <Phone size={16} className="text-cyber-blue-500 group-hover:scale-110 transition-transform" />
                <span>{personalInfo.phone}</span>
              </motion.a>
              <motion.a
                href={`https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                variants={contactItemVariants}
                custom={2}
                whileHover="hover"
                className="flex items-center space-x-3 text-gray-400 hover:text-cyber-blue-500 transition-colors duration-300 text-sm group"
              >
                <Linkedin size={16} className="text-cyber-blue-500 group-hover:scale-110 transition-transform" />
                <span>LinkedIn Profile</span>
              </motion.a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-cyber-blue-500/20 w-full">
              {[
                { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
                { icon: Linkedin, href: `https://${personalInfo.linkedin}`, label: 'LinkedIn' },
                { icon: Phone, href: `tel:${personalInfo.phone}`, label: 'Phone' },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label === 'LinkedIn' ? '_blank' : undefined}
                  rel={social.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                  variants={socialIconVariants}
                  custom={index}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-10 h-10 bg-cyber-dark-500/60 backdrop-blur-cyber border border-cyber-blue-500/30 rounded-lg flex items-center justify-center text-cyber-blue-500 hover:bg-cyber-blue-500/10 hover:border-cyber-blue-500 transition-all duration-300 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={bottomBarVariants}
          className="pt-8 border-t border-cyber-blue-500/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.div
              className="text-gray-400 text-sm"
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </motion.div>
            <motion.div
              className="text-gray-400 text-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span>Build by kavindi rajapaksha</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
