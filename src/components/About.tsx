import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Database, Cloud, BarChart, Award, Briefcase, Cpu, Layers, Palette, Terminal, Zap } from 'lucide-react';
import { skills, certifications, personalInfo } from '../data/portfolio';

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
      className="py-20 bg-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyber-blue-600/5 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-glow-blue">
            About Me
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyber-blue-500 to-cyber-blue-700 mx-auto rounded-full mb-8" />
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {personalInfo.summary}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-center bg-cyber-dark-500/60 backdrop-blur-cyber border border-cyber-blue-500/30 rounded-xl shadow-lg hover:shadow-cyber-blue-lg transition-all duration-300 p-6 border-t-4 border-cyber-blue-500">
                <item.icon className="w-8 h-8 mx-auto mb-3 text-cyber-blue-500" />
                <div className="text-3xl font-bold text-white mb-1">
                  {item.label}
                </div>
                <p className="text-sm text-gray-400">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-cyber-dark-500/60 backdrop-blur-cyber border border-cyber-blue-500/30 rounded-xl shadow-xl hover:shadow-cyber-blue-lg transition-all duration-300 p-6 border-t-4 border-cyber-blue-500">
              <h3 className="flex items-center text-xl font-bold text-white mb-6">
                <Code className="mr-3 text-cyber-blue-500" />
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
                    <span className="inline-block w-1.5 h-1.5 bg-cyber-blue-500 rounded-full" />
                    <span className="text-gray-300">
                      {expertise}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-cyber-dark-500/60 backdrop-blur-cyber border border-cyber-blue-500/30 rounded-xl shadow-xl hover:shadow-cyber-blue-lg transition-all duration-300 p-6 border-t-4 border-cyber-blue-500">
              <h3 className="flex items-center text-xl font-bold text-white mb-6">
                <Award className="mr-3 text-cyber-blue-500" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="bg-cyber-dark-500/80 backdrop-blur-cyber border border-cyber-blue-500/30 rounded-lg p-4 hover:border-cyber-blue-500/50 transition-colors">
                      <p className="text-sm text-gray-300">
                        {cert}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-blue-500 to-cyber-blue-700 mb-4 shadow-cyber-blue"
            >
              <BarChart className="text-white" size={32} />
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Technical Skills
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              Comprehensive expertise across modern data engineering stack
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, techs], categoryIndex) => {
                // Map categories to icons
                const categoryIcons: Record<string, any> = {
                  'Programming Languages': Code,
                  'Cloud Technologies': Cloud,
                  'Database Systems': Database,
                  'Data Visualization': Palette,
                  'Web Development': Layers,
                  'Machine Learning & AI': Cpu,
                  'DevOps & Tools': Terminal,
                };

                const Icon = categoryIcons[category] || Zap;

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ 
                      delay: 0.6 + categoryIndex * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <div className="relative h-full bg-gradient-to-br from-cyber-dark-500/90 to-cyber-dark-500/70 backdrop-blur-cyber border border-cyber-blue-500/40 rounded-xl p-5 hover:border-cyber-blue-500/70 hover:shadow-cyber-blue-lg transition-all duration-300 overflow-hidden">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue-500/0 to-cyber-blue-700/0 group-hover:from-cyber-blue-500/5 group-hover:to-cyber-blue-700/5 transition-all duration-300 rounded-xl" />
                      
                      {/* Category Header */}
                      <div className="relative flex items-center space-x-3 mb-4 pb-4 border-b border-cyber-blue-500/30">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-blue-500/20 to-cyber-blue-700/20 flex items-center justify-center group-hover:from-cyber-blue-500/30 group-hover:to-cyber-blue-700/30 transition-all duration-300">
                          <Icon className="text-cyber-blue-500" size={20} />
                        </div>
                        <h4 className="text-lg font-bold text-white leading-tight">
                          {category}
                        </h4>
                        <div className="ml-auto px-2 py-0.5 rounded-full bg-cyber-blue-500/20 text-cyber-blue-400 text-xs font-semibold">
                          {techs.length}
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="relative flex flex-wrap gap-2">
                        {techs.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                            transition={{ 
                              delay: 0.7 + categoryIndex * 0.1 + techIndex * 0.03,
                              type: "spring",
                              stiffness: 200
                            }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="inline-flex items-center"
                          >
                            <span className="px-3 py-1.5 bg-cyber-dark-500/60 backdrop-blur-sm border border-cyber-blue-500/40 text-gray-200 rounded-lg text-xs font-medium shadow-sm hover:bg-cyber-blue-500/10 hover:border-cyber-blue-500/60 transition-all duration-200">
                              {tech}
                            </span>
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
        </motion.div>
      </div>
    </section>
  );
}
