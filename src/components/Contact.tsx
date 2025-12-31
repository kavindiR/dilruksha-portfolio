import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Linkedin, Phone, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { Button } from './ui/button';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: personalInfo.linkedin.replace('www.', ''),
      href: `https://${personalInfo.linkedin}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-blue-600/5 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-white mb-6 text-glow-blue">
            Get In Touch
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyber-blue-500 to-cyber-blue-700 mx-auto rounded-full mb-8" />
          <p className="text-lg md:text-xl text-gray-300 text-gray-300 max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or innovative data engineering projects.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.label === 'LinkedIn' ? '_blank' : undefined}
                rel={method.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="group relative bg-cyber-dark-500/60 bg-cyber-dark-500/60 backdrop-blur-cyber border border-cyber-blue-500/30 border-cyber-blue-500/30 border-cyber-blue-500/20 rounded-xl shadow-lg hover:shadow-cyber-blue-lg transition-all duration-300 overflow-hidden border-t-4 border-cyber-blue-500 p-6">
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-br from-cyber-blue-500 to-cyber-blue-700 rounded-full flex items-center justify-center text-white mb-4 shadow-cyber-blue group-hover:shadow-cyber-blue-lg"
                    >
                      <method.icon size={28} />
                    </motion.div>

                    <h3 className="text-lg font-bold text-white text-white mb-2">
                      {method.label}
                    </h3>

                    <p className="text-sm text-gray-300 text-gray-300 break-all">
                      {method.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-cyber-blue-500 to-cyber-blue-700 text-white border border-cyber-blue-500/50 rounded-xl shadow-cyber-blue-lg p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-cyber-blue"
              >
                <Send size={40} />
              </motion.div>

              <h3 className="text-3xl mb-4 text-center text-white font-bold">
                Ready to Start a Conversation?
              </h3>

              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-center">
                Whether you have a project in mind, need consultation on data engineering solutions,
                or just want to connect, I'd love to hear from you.
              </p>
              <div className="text-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => window.location.href = `mailto:${personalInfo.email}`}
                  className="bg-white text-cyber-blue-600 hover:bg-white/90 shadow-lg"
                >
                  <Mail size={20} className="mr-2" />
                  Send Me an Email
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
