import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleMenu, closeMenu, selectIsMenuOpen, selectIsScrolled, setScrolled } from '../store/slices/uiSlice';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

// Animation variants for header
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay: 0.1,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      delay: 0.15 + index * 0.05,
    },
  }),
  hover: {
    y: -2,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      delay: 0.5,
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
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

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
      opacity: {
        duration: 0.2,
      },
    },
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      height: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
      opacity: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  },
};

const mobileNavItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      delay: 0.1 + index * 0.03,
    },
  }),
};

export default function Header() {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector(selectIsMenuOpen);
  const isScrolled = useAppSelector(selectIsScrolled);

  useEffect(() => {
    const handleScroll = () => {
      dispatch(setScrolled(window.scrollY > 20));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const handleNavClick = (href: string) => {
    dispatch(closeMenu());
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cyber-dark-500/90 backdrop-blur-cyber shadow-lg border-b border-cyber-blue-500/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0"
          >
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyber-blue-500 to-cyber-blue-600 bg-clip-text text-transparent text-glow-blue-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              DR
            </motion.a>
          </motion.div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover="hover"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-gray-300 hover:text-cyber-blue-500 transition-colors duration-300 font-medium relative"
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-blue-500"
                  whileHover={{ width: '100%' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.a
              href="/resume.pdf"
              download
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-blue-500 to-cyber-blue-600 text-white border border-cyber-blue-500/50 hover:from-cyber-blue-400 hover:to-cyber-blue-500 hover:shadow-cyber-blue-sm transition-all duration-300 font-medium"
            >
              <Download size={18} />
              <span>Download CV</span>
            </motion.a>

            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => dispatch(toggleMenu())}
              className="md:hidden p-2 rounded-lg bg-cyber-dark-500/80 backdrop-blur-cyber text-cyber-blue-500 border border-cyber-blue-500/30"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden pb-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-3 pt-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    variants={mobileNavItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-gray-300 hover:text-cyber-blue-500 transition-colors duration-300 font-medium py-2"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.a
                  href="/resume.pdf"
                  download
                  variants={mobileNavItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={navItems.length}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-blue-500 to-cyber-blue-600 text-white border border-cyber-blue-500/50 hover:from-cyber-blue-400 hover:to-cyber-blue-500 transition-all duration-300 font-medium mt-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={18} />
                  <span>Download CV</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
