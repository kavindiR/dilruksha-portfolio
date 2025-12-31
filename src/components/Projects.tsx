import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Folder, Tag, CheckCircle } from 'lucide-react';
import { projects } from '../data/portfolio';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section
      id="projects"
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-white text-gray-900 mb-6 text-glow-blue">
            Featured Projects
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyber-blue-500 to-cyber-blue-700 mx-auto rounded-full mb-8" />
          <p className="text-lg md:text-xl text-gray-300 text-gray-300 text-gray-600">
            Innovative solutions across various domains
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setSelectedProject(project.id)}
              onMouseLeave={() => setSelectedProject(null)}
              className="group relative bg-cyber-dark-500/60 bg-cyber-dark-500/60 backdrop-blur-cyber border border-cyber-blue-500/30 border-cyber-blue-500/30 border-cyber-blue-500/20 rounded-xl shadow-lg hover:shadow-cyber-blue-lg transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-blue-500 to-cyber-blue-700" />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    animate={{
                      rotate: selectedProject === project.id ? 15 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 bg-gradient-to-br from-cyber-blue-500 to-cyber-blue-700 rounded-lg flex items-center justify-center text-white shadow-cyber-blue"
                  >
                    <Folder size={24} />
                  </motion.div>
                  <span className="px-3 py-1 bg-cyber-blue-500/20 text-cyber-blue-500 border border-cyber-blue-500/30 rounded-full text-xs font-medium">
                    {project.domain}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-blue-500 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag size={16} className="text-cyber-blue-500" />
                    <span className="text-sm font-semibold text-white text-white ">
                      Technologies:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.1 }}
                        className="px-2 py-1 bg-cyber-dark-500/80 bg-cyber-dark-500/80 backdrop-blur-cyber border border-cyber-blue-500/30 border-cyber-blue-500/30 border-cyber-blue-500/20 text-gray-200 text-gray-200 text-gray-700 rounded text-xs font-medium shadow-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-cyber-dark-500/80 backdrop-blur-cyber border border-cyber-blue-500/30 text-gray-200 rounded text-xs font-medium shadow-sm">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-cyber-blue-500/30 border-cyber-blue-500/30 border-cyber-blue-500/20 pt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle size={16} className="text-cyber-blue-500" />
                    <span className="text-sm font-semibold text-white text-white ">
                      Key Achievements:
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-gray-300 text-gray-300 text-gray-600 flex items-start"
                      >
                        <span className="inline-block w-1 h-1 bg-cyber-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: selectedProject === project.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-blue-500 to-cyber-blue-700 origin-left"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
