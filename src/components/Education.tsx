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
      className="py-20 bg-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyber-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyber-blue-600/5 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-white text-gray-900 mb-6 text-glow-blue">
            Education
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyber-blue-500 to-cyber-blue-700 mx-auto rounded-full mb-8" />
          <p className="text-lg md:text-xl text-gray-300 text-gray-300 text-gray-600">
            Academic excellence and continuous learning
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-10">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-cyber-dark-500/60 bg-cyber-dark-500/60 backdrop-blur-cyber border border-cyber-blue-500/30 border-cyber-blue-500/30 border-cyber-blue-500/20 rounded-xl shadow-xl hover:shadow-cyber-blue-lg transition-all duration-300 overflow-hidden border-t-4 border-cyber-blue-500">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-gradient-to-br from-cyber-blue-500 to-cyber-blue-700 p-8 flex flex-col items-center justify-center text-white">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-cyber-blue"
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
                      <h3 className="text-xl font-bold text-white text-white pr-4">
                        {edu.degree}
                      </h3>
                      {edu.status === 'Reading' && (
                        <span className="px-3 py-1 bg-cyber-blue-500/20 text-cyber-blue-500 border border-cyber-blue-500/30 rounded-full text-xs font-medium flex-shrink-0">
                          In Progress
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-semibold text-cyber-blue-400 mb-3">
                      {edu.institution}
                    </h4>

                    <div className="flex items-center space-x-2 text-sm text-gray-300 text-gray-300 mb-4">
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
                          className="flex items-start text-sm text-gray-300 text-gray-300 "
                        >
                          <Award size={16} className="mr-2 mt-0.5 text-cyber-blue-500 flex-shrink-0" />
                          <span>{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
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
