import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Linkedin, Phone, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'from-blue-600 to-blue-700',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: personalInfo.linkedin.replace('www.', ''),
      href: `https://${personalInfo.linkedin}`,
      color: 'from-blue-700 to-blue-800',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: 'from-cyan-600 to-cyan-700',
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -right-48 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-cyan-400/10 dark:bg-cyan-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or innovative data engineering projects.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
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
                className="group relative bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${method.color}`} />

                <div className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center text-white mb-4 shadow-lg group-hover:shadow-xl`}
                  >
                    <method.icon size={28} />
                  </motion.div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {method.label}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
                    {method.value}
                  </p>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${method.color} origin-left`}
                />
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <Send size={40} />
            </motion.div>

            <h3 className="text-3xl font-bold mb-4">
              Ready to Start a Conversation?
            </h3>

            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you have a project in mind, need consultation on data engineering solutions,
              or just want to connect, I'd love to hear from you.
            </p>

            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Mail size={20} />
              <span>Send Me an Email</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
