import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Phone, Download, ChevronDown, Cpu, Zap, Network, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  connections: number[];
  pulse: number;
  pulseSpeed: number;
}

interface Connection {
  x1: number;
  y1: number;
  x2: number;
  x3: number;
  y2: number;
  y3: number;
  opacity: number;
  width: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const animationRef = useRef<number>(0);
  const particleCount = 100;

  const handleScrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const initParticles = useCallback(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const newParticles: Particle[] = [];
    const colors = [
      '#3B82F6', // Blue
      '#06B6D4', // Cyan
      '#8B5CF6', // Violet
      '#10B981', // Emerald
      '#F59E0B', // Amber
    ];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.05 + 0.02,
      });
    }
    setParticles(newParticles);
  }, []);

  const updateParticles = useCallback(() => {
    if (!containerRef.current || particles.length === 0) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    const newParticles = [...particles];
    const newConnections: Connection[] = [];
    const connectionDistance = 150;
    const mouseInfluenceRadius = 200;
    const mouseRepelStrength = 300;
    const mouseAttractStrength = 150;

    // Update particle positions and apply mouse interaction
    newParticles.forEach((particle, i) => {
      // Calculate distance to mouse
      const dx = mousePos.x - particle.x;
      const dy = mousePos.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Mouse interaction
      if (distance < mouseInfluenceRadius && isInteracting) {
        const angle = Math.atan2(dy, dx);
        const force = mouseRepelStrength / (distance + 1);
        particle.vx -= Math.cos(angle) * force * 0.01;
        particle.vy -= Math.sin(angle) * force * 0.01;
      }

      // Update position with velocity
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off walls
      if (particle.x < 0 || particle.x > width) particle.vx *= -0.9;
      if (particle.y < 0 || particle.y > height) particle.vy *= -0.9;

      // Keep within bounds
      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));

      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Update pulse
      particle.pulse += particle.pulseSpeed;

      // Reset connections
      particle.connections = [];
    });

    // Create connections between nearby particles
    for (let i = 0; i < newParticles.length; i++) {
      for (let j = i + 1; j < newParticles.length; j++) {
        const p1 = newParticles[i];
        const p2 = newParticles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          p1.connections.push(j);
          
          const opacity = 1 - (distance / connectionDistance);
          const width = 0.5 + opacity * 1.5;
          
          newConnections.push({
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            x3: (p1.x + p2.x) / 2,
            y3: (p1.y + p2.y) / 2,
            opacity,
            width,
          });
        }
      }
    }

    setParticles(newParticles);
    setConnections(newConnections);
  }, [particles, mousePos, isInteracting]);

  const animate = useCallback(() => {
    updateParticles();
    draw();

    if (canvasRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [updateParticles]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size with device pixel ratio
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(30, 41, 59, 0.05)');
    gradient.addColorStop(0.5, 'rgba(30, 64, 175, 0.05)');
    gradient.addColorStop(1, 'rgba(8, 145, 178, 0.05)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw connections with gradient
    connections.forEach(conn => {
      const gradient = ctx.createLinearGradient(conn.x1, conn.y1, conn.x2, conn.y2);
      gradient.addColorStop(0, `rgba(59, 130, 246, ${conn.opacity * 0.3})`);
      gradient.addColorStop(0.5, `rgba(139, 92, 246, ${conn.opacity * 0.2})`);
      gradient.addColorStop(1, `rgba(6, 182, 212, ${conn.opacity * 0.3})`);

      ctx.beginPath();
      ctx.moveTo(conn.x1, conn.y1);
      
      // Create curved connections
      const cp1x = (conn.x1 + conn.x3) / 2 + (conn.y2 - conn.y1) * 0.1;
      const cp1y = (conn.y1 + conn.y3) / 2 - (conn.x2 - conn.x1) * 0.1;
      const cp2x = (conn.x2 + conn.x3) / 2 + (conn.y2 - conn.y1) * 0.1;
      const cp2y = (conn.y2 + conn.y3) / 2 - (conn.x2 - conn.x1) * 0.1;
      
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, conn.x2, conn.y2);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = conn.width;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Add glow effect to connections near mouse
      if (isInteracting) {
        const mouseDist = distanceToLine(mousePos.x, mousePos.y, conn.x1, conn.y1, conn.x2, conn.y2);
        if (mouseDist < 50) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }
    });

    // Draw particles with glow effect
    particles.forEach(particle => {
      const pulseScale = 1 + Math.sin(particle.pulse) * 0.3;
      const radius = particle.radius * pulseScale;

      // Particle glow
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, radius * 3, 0, Math.PI * 2);
      const glowGradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, radius * 3
      );
      glowGradient.addColorStop(0, `${particle.color}40`);
      glowGradient.addColorStop(1, `${particle.color}00`);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Particle core
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
      const coreGradient = ctx.createRadialGradient(
        particle.x - radius / 2, particle.y - radius / 2, 0,
        particle.x, particle.y, radius
      );
      coreGradient.addColorStop(0, '#ffffff');
      coreGradient.addColorStop(0.5, particle.color);
      coreGradient.addColorStop(1, `${particle.color}80`);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      // Particle highlight
      ctx.beginPath();
      ctx.arc(particle.x - radius * 0.3, particle.y - radius * 0.3, radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
    });

    // Draw mouse interaction effect
    if (isInteracting) {
      const interactionRadius = 100;
      const rippleRadius = interactionRadius * (1 + Math.sin(Date.now() * 0.005) * 0.2);

      // Ripple effect
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, rippleRadius, 0, Math.PI * 2);
      const rippleGradient = ctx.createRadialGradient(
        mousePos.x, mousePos.y, 0,
        mousePos.x, mousePos.y, rippleRadius
      );
      rippleGradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
      rippleGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = rippleGradient;
      ctx.fill();

      // Mouse point glow
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.fill();

      // Mouse point core
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#3B82F6';
      ctx.fill();
    }
  }, [particles, connections, mousePos, isInteracting]);

  const distanceToLine = (px: number, py: number, x1: number, y1: number, x2: number, y2: number) => {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleInteractionStart = () => {
    setIsInteracting(true);
    // Add velocity to particles based on mouse position
    setParticles(prev => prev.map(particle => {
      const dx = mousePos.x - particle.x;
      const dy = mousePos.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const strength = 5;
        return {
          ...particle,
          vx: Math.cos(angle) * strength,
          vy: Math.sin(angle) * strength,
        };
      }
      return particle;
    }));
  };

  const handleInteractionEnd = () => {
    setIsInteracting(false);
  };

  useEffect(() => {
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const handleResize = () => {
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles]);

  useEffect(() => {
    if (particles.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, particles.length]);

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* Interactive Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 -top-48 -left-48 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-96 h-96 -bottom-48 -right-48 bg-cyan-400/10 dark:bg-cyan-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating Icons */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-blue-400/20 dark:text-blue-500/10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Network size={80} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 text-cyan-400/20 dark:text-cyan-500/10"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Cpu size={60} />
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 right-1/3 text-violet-400/20 dark:text-violet-500/10"
          animate={{
            y: [20, 0, 20],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Zap size={50} />
        </motion.div>
      </div>

      {/* Interactive Hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-blue-600 dark:text-cyan-400 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Sparkles size={16} />
        <span>Click or tap to interact with the network</span>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={item} className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 p-1 shadow-2xl relative"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 blur-xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-4xl sm:text-5xl font-bold text-blue-600 dark:text-cyan-400 relative z-10">
                {personalInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.div variants={item} className="mb-8">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {personalInfo.title}
            </motion.h2>
          </motion.div>

          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20"
          >
            {personalInfo.summary}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={handleInteractionStart}
              onHoverEnd={handleInteractionEnd}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            >
              <Mail size={20} />
              <span>Contact Me</span>
            </motion.a>

            <motion.a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={handleInteractionStart}
              onHoverEnd={handleInteractionEnd}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </motion.a>

            <motion.a
              href={`tel:${personalInfo.phone}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={handleInteractionStart}
              onHoverEnd={handleInteractionEnd}
              className="flex items-center space-x-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 border-2 border-gray-300/50 dark:border-gray-700/50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            >
              <Phone size={20} />
              <span className="hidden sm:inline">{personalInfo.phone}</span>
              <span className="sm:hidden">Call</span>
            </motion.a>
          </motion.div>

          <motion.button
            variants={item}
            onClick={handleScrollToAbout}
            className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            onHoverStart={handleInteractionStart}
            onHoverEnd={handleInteractionEnd}
          >
            <ChevronDown className="text-gray-600 dark:text-gray-300" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}