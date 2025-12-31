import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, MapPin, Calendar, Clock } from 'lucide-react';
import { experiences } from '../data/portfolio';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 bg-black relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-white mb-6 text-glow-blue">
            Professional Experience
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyber-blue-500 to-cyber-blue-700 mx-auto rounded-full mb-8" />
          <p className="text-lg md:text-xl text-gray-300 text-gray-300 ">
            6+ years of delivering innovative data solutions
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyber-blue-500 to-cyber-blue-700" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-cyber-blue-500 to-cyber-blue-700 rounded-full items-center justify-center z-10 shadow-cyber-blue">
                  <Briefcase className="text-white" size={20} />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className="bg-cyber-dark-500/60 bg-cyber-dark-500/60 backdrop-blur-cyber border border-cyber-blue-500/30 border-cyber-blue-500/30 border-cyber-blue-500/20 rounded-xl shadow-xl hover:shadow-cyber-blue-lg transition-all duration-300 p-6 border-t-4 border-cyber-blue-500">
                    <div className="flex md:hidden items-center space-x-2 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyber-blue-500 to-cyber-blue-700 rounded-full flex items-center justify-center">
                        <Briefcase className="text-white" size={16} />
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-3 py-1 bg-cyber-blue-500/20 text-cyber-blue-500 border border-cyber-blue-500/30 rounded-full text-xs font-medium">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white text-white mb-2">
                      {exp.title}
                    </h3>
                    <h4 className="text-xl font-semibold text-cyber-blue-500 mb-3">
                      {exp.company}
                    </h4>

                    <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-300 text-gray-300 ">
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    {exp.domain && (
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-cyber-blue-500/20 text-cyber-blue-500 border border-cyber-blue-500/30 rounded-full text-sm font-medium">
                          {exp.domain}
                        </span>
                      </div>
                    )}

                    <div className="mb-4">
                      <h5 className="font-semibold text-white text-white mb-2">
                        Key Responsibilities:
                      </h5>
                      <ul className="space-y-2">
                        {exp.responsibilities.slice(0, 3).map((resp, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-300 text-gray-300 flex items-start"
                          >
                            <span className="inline-block w-1.5 h-1.5 bg-cyber-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-white text-white mb-2">
                        Technologies:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.slice(0, 6).map((tech, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{ scale: 1.1 }}
                            className="px-2 py-1 bg-cyber-dark-500/80 bg-cyber-dark-500/80 backdrop-blur-cyber border border-cyber-blue-500/30 border-cyber-blue-500/30 border-cyber-blue-500/20 text-gray-200 text-gray-200 text-gray-700 rounded text-xs font-medium"
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {exp.technologies.length > 6 && (
                          <span className="px-2 py-1 bg-cyber-dark-500/80 bg-cyber-dark-500/80 backdrop-blur-cyber border border-cyber-blue-500/30 border-cyber-blue-500/30 border-cyber-blue-500/20 text-gray-200 text-gray-200 text-gray-700 rounded text-xs font-medium">
                            +{exp.technologies.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
