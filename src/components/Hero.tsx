import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { ArrowDown } from 'lucide-react';
import { personalInfo, education } from '../data/portfolio';
import profileImage from '../assets/Dilruksha.png';

// Professional Data Science Background Animation Component
function DataScienceBackground() {
  // Neural Network Structure - 3 layers with proper connections
  const neuralNetwork = useMemo(() => {
    const inputLayer = Array.from({ length: 6 }, (_, i) => ({
      id: `input-${i}`,
      x: 15,
      y: 20 + i * 12,
    }));

    const hiddenLayer = Array.from({ length: 8 }, (_, i) => ({
      id: `hidden-${i}`,
      x: 50,
      y: 15 + i * 10,
    }));

    const outputLayer = Array.from({ length: 4 }, (_, i) => ({
      id: `output-${i}`,
      x: 85,
      y: 25 + i * 15,
    }));

    // Create connections from input to hidden
    const inputToHidden = inputLayer.flatMap((input) =>
      hiddenLayer.map((hidden, idx) => ({
        id: `conn-${input.id}-${hidden.id}`,
        from: input,
        to: hidden,
        weight: 0.3 + Math.random() * 0.4,
      }))
    );

    // Create connections from hidden to output
    const hiddenToOutput = hiddenLayer.flatMap((hidden) =>
      outputLayer.map((output, idx) => ({
        id: `conn-${hidden.id}-${output.id}`,
        from: hidden,
        to: output,
        weight: 0.3 + Math.random() * 0.4,
      }))
    );

    return {
      inputLayer,
      hiddenLayer,
      outputLayer,
      connections: [...inputToHidden, ...hiddenToOutput],
    };
  }, []);

  // Data Pipeline Stages
  const pipelineStages = useMemo(() => [
    { id: 'extract', x: 10, label: 'Extract', width: 15 },
    { id: 'transform', x: 30, label: 'Transform', width: 20 },
    { id: 'load', x: 55, label: 'Load', width: 15 },
    { id: 'analyze', x: 75, label: 'Analyze', width: 15 },
  ], []);

  // Statistical Distribution Points (Normal Distribution Curve)
  const distributionPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 50; i++) {
      const x = (i / 50) * 100;
      // Normal distribution curve (bell curve)
      const y = 80 + Math.exp(-Math.pow((x - 50) / 15, 2)) * 15;
      points.push({ x, y, opacity: 0.3 + Math.random() * 0.4 });
    }
    return points;
  }, []);

  // Data Clusters (K-means style visualization)
  const clusters = useMemo(() => {
    const clusterCenters = [
      { x: 25, y: 30, color: 'rgba(59, 130, 246, 0.6)' },
      { x: 70, y: 25, color: 'rgba(59, 130, 246, 0.5)' },
      { x: 50, y: 60, color: 'rgba(59, 130, 246, 0.4)' },
    ];

    return clusterCenters.flatMap((center, clusterIdx) =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 3 + Math.random() * 4;
        return {
          id: `cluster-${clusterIdx}-${i}`,
          x: center.x + Math.cos(angle) * radius,
          y: center.y + Math.sin(angle) * radius,
          color: center.color,
        };
      })
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full animated-data-grid" />
      </div>

      {/* Neural Network Visualization */}
      <svg className="absolute inset-0 w-full h-full opacity-40" style={{ zIndex: 1 }}>
        {/* Neural Network Connections */}
        {neuralNetwork.connections.map((conn, idx) => (
            <g key={conn.id}>
              <defs>
                <linearGradient id={`gradient-${conn.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                  <stop offset="50%" stopColor={`rgba(59, 130, 246, ${conn.weight})`} />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
              </defs>
              <motion.line
                x1={`${conn.from.x}%`}
                y1={`${conn.from.y}%`}
                x2={`${conn.to.x}%`}
                y2={`${conn.to.y}%`}
                stroke={`url(#gradient-${conn.id})`}
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, conn.weight, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: (idx % 10) * 0.2,
                  ease: 'easeInOut',
                }}
              />
            </g>
        ))}

        {/* Neural Network Nodes */}
        {[...neuralNetwork.inputLayer, ...neuralNetwork.hiddenLayer, ...neuralNetwork.outputLayer].map((node, idx) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="4"
            fill="rgba(59, 130, 246, 0.8)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: idx * 0.1,
              ease: 'easeInOut',
            }}
            style={{
              filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))',
            }}
          />
        ))}

        {/* Statistical Distribution Curve */}
        <motion.path
          d={distributionPoints.reduce((path, p, i) => 
            path + (i === 0 ? `M ${p.x}% ${p.y}%` : ` L ${p.x}% ${p.y}%`), ''
          )}
          fill="none"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>

      {/* Data Pipeline Stages */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {pipelineStages.map((stage, idx) => (
          <motion.div
            key={stage.id}
            className="absolute"
            style={{
              left: `${stage.x}%`,
              top: '75%',
              width: `${stage.width}%`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: idx * 0.5,
              ease: 'easeInOut',
            }}
          >
            <div className="relative h-1 bg-gradient-to-r from-transparent via-cyber-blue-500 to-transparent rounded-full" />
            <motion.div
              className="absolute -top-6 left-0 text-xs text-cyber-blue-400 font-medium uppercase tracking-wider"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.3,
              }}
            >
              {stage.label}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Data Clusters (K-means visualization) */}
      {clusters.map((point, idx) => (
        <motion.div
          key={point.id}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            backgroundColor: point.color,
            boxShadow: `0 0 4px ${point.color}`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: idx * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Feature Engineering Flow - Data Transformation */}
      <svg className="absolute inset-0 w-full h-full opacity-30" style={{ zIndex: 1 }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const startX = 20 + i * 15;
          const endX = startX + 10;
          const y = 45 + Math.sin(i) * 5;
          return (
            <motion.g key={`flow-${i}`}>
              <motion.circle
                cx={`${startX}%`}
                cy={`${y}%`}
                r="3"
                fill="rgba(59, 130, 246, 0.6)"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
              <motion.line
                x1={`${startX}%`}
                y1={`${y}%`}
                x2={`${endX}%`}
                y2={`${y}%`}
                stroke="rgba(59, 130, 246, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
              />
              <motion.circle
                cx={`${endX}%`}
                cy={`${y}%`}
                r="3"
                fill="rgba(59, 130, 246, 0.6)"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3 + 0.5,
                }}
              />
            </motion.g>
          );
        })}
      </svg>

      {/* Gradient Overlays for Depth */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 15% 25%, rgba(59, 130, 246, 0.12) 0%, transparent 40%),
            radial-gradient(ellipse at 85% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.06) 0%, transparent 60%)
          `,
          zIndex: 0,
        }}
      />
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get education data for display
  const mscDegree = education.find(edu => edu.degree.includes('Data Science & Artificial Intelligence'));
  const bscDegree = education.find(edu => edu.degree.includes('Statistics & Operations Research'));

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-12">
          {/* Left Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-2xl lg:max-w-3xl">
              <img
                src={profileImage}
                alt={personalInfo.name}
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white space-y-6 lg:space-y-8"
          >
            {/* Professional Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-2"
            >
              <p className="text-lg md:text-xl lg:text-2xl font-semibold text-cyber-blue-400 uppercase tracking-wider">
                Data Engineering Consultant
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue-500 to-cyber-blue-700 rounded-full" />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-none text-glow-blue-sm">
                DILRUKSHA RAJAPAKSHA
              </h1>
            </motion.div>

            {/* Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4 pt-2"
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">
                Transforming Data into
                <span className="block text-cyber-blue-400"> Strategic Business Value</span>
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl">
                6+ years of expertise in architecting scalable data solutions, optimizing data pipelines, 
                and enabling data-driven decision making across cloud platforms.
              </p>
            </motion.div>

            {/* Credentials Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-4"
            >
              <div className="inline-flex items-center space-x-4 px-6 py-3 bg-cyber-dark-500/60 backdrop-blur-sm border border-cyber-blue-500/30 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-cyber-blue-400 uppercase tracking-wider">
                    Certified
                  </span>
                </div>
                <div className="h-4 w-px bg-cyber-blue-500/50" />
                <div className="flex items-center space-x-3 text-sm">
                  <span className="text-gray-300">Microsoft</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">AWS</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">Databricks</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('#about')}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2 text-white hover:text-gray-300 transition-colors"
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

