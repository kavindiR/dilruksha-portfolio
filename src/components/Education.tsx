import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, Award, Star } from 'lucide-react';
import { education } from '../data/portfolio';

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="education"
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Education
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            Academic excellence and continuous learning
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-cyan-600 p-8 flex flex-col items-center justify-center text-white">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4"
                  >
                    <GraduationCap size={40} />
                  </motion.div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Star size={20} className="text-yellow-300" />
                      <span className="text-2xl font-bold">{edu.gpa}</span>
                    </div>
                    <div className="text-sm opacity-90">{edu.grade || edu.status}</div>
                  </div>
                </div>

                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white pr-4">
                      {edu.degree}
                    </h3>
                    {edu.status === 'Reading' && (
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-xs font-medium flex-shrink-0">
                        In Progress
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-semibold text-blue-600 dark:text-cyan-400 mb-3">
                    {edu.institution}
                  </h4>

                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Calendar size={16} />
                    <span>{edu.period}</span>
                  </div>

                  <div className="space-y-2">
                    {edu.highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + index * 0.2 + idx * 0.1 }}
                        className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                      >
                        <Award size={16} className="mr-2 mt-0.5 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
                        <span>{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
