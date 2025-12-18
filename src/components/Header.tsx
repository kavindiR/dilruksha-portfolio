import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTheme, selectTheme } from '../store/slices/themeSlice';
import { toggleMenu, closeMenu, selectIsMenuOpen, selectIsScrolled, setScrolled } from '../store/slices/uiSlice';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
            >
              DR
            </a>
          </motion.div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(toggleMenu())}
              className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
