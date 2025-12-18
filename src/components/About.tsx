import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Database, Cloud, BarChart, Award, Briefcase } from 'lucide-react';
import { skills, certifications } from '../data/portfolio';

const highlights = [
  { icon: Briefcase, label: '6+ Years', subtitle: 'Experience' },
  { icon: Cloud, label: '20+', subtitle: 'Cloud Projects' },
  { icon: Database, label: '50+', subtitle: 'Data Pipelines' },
  { icon: Award, label: '3+', subtitle: 'Certifications' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <item.icon className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-cyan-400" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {item.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {item.subtitle}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Code className="mr-3 text-blue-600 dark:text-cyan-400" />
              Core Expertise
            </h3>
            <div className="space-y-4">
              {[
                'Data Architecture & Engineering',
                'Cloud Data Solutions (Azure, GCP, AWS)',
                'ETL/ELT Pipeline Development',
                'Machine Learning & AI Integration',
                'Data Warehousing & Lakehouse',
                'Performance Optimization',
              ].map((expertise, index) => (
                <motion.div
                  key={expertise}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-blue-600 dark:bg-cyan-400 rounded-full" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {expertise}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Award className="mr-3 text-blue-600 dark:text-cyan-400" />
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {cert}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center flex items-center justify-center">
            <BarChart className="mr-3 text-blue-600 dark:text-cyan-400" />
            Technical Skills
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, techs], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + categoryIndex * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg"
              >
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4 border-b-2 border-blue-600 dark:border-cyan-400 pb-2">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + categoryIndex * 0.1 + techIndex * 0.02 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
