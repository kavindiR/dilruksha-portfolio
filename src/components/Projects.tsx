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
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
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
              onHoverStart={() => setSelectedProject(project.id)}
              onHoverEnd={() => setSelectedProject(null)}
              className="group relative bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600" />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    animate={{
                      rotate: selectedProject === project.id ? 15 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white shadow-lg"
                  >
                    <Folder size={24} />
                  </motion.div>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium">
                    {project.domain}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag size={16} className="text-blue-600 dark:text-cyan-400" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      Technologies:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.1 }}
                        className="px-2 py-1 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded text-xs font-medium shadow-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded text-xs font-medium shadow-sm">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      Key Achievements:
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-gray-600 dark:text-gray-300 flex items-start"
                      >
                        <span className="inline-block w-1 h-1 bg-green-600 dark:bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
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
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 origin-left"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
