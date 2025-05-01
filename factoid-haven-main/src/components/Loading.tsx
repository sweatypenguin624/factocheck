
import { motion } from 'framer-motion';

interface LoadingProps {
  message?: string;
  type?: 'full' | 'inline';
}

/**
 * Loading component with elegant animations
 * 
 * @param message - Optional loading message to display
 * @param type - 'full' for full-screen loader, 'inline' for smaller component-level loader
 */
const Loading = ({ message = 'Processing your request...', type = 'inline' }: LoadingProps) => {
  // Dots animation sequence
  const dotsVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Individual dot animation
  const dotVariants = {
    initial: { y: 0, opacity: 0.4 },
    animate: {
      y: [0, -8, 0],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Pulse animation for container
  const pulseVariants = {
    initial: { opacity: 0.8, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  };

  // Full-screen loader
  if (type === 'full') {
    return (
      <motion.div 
        className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 glassmorphism rounded-xl p-8 shadow-xl border border-gray-200 dark:border-gray-800"
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        >
          <div className="relative flex justify-center items-center h-16 mb-4">
            <motion.div 
              className="absolute w-12 h-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            <motion.div 
              className="absolute w-12 h-12 rounded-full border-4 border-t-transparent border-r-primary/30 border-b-transparent border-l-transparent"
              animate={{ rotate: -120 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </div>
          
          <p className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            {message}
          </p>
          
          <motion.div 
            className="flex space-x-1.5 mt-1"
            variants={dotsVariants}
            initial="initial"
            animate="animate"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                variants={dotVariants}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // Inline/component loader
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-8 glassmorphism rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex justify-center items-center h-12 mb-3">
        <motion.div 
          className="absolute w-10 h-10 rounded-full border-3 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="absolute w-10 h-10 rounded-full border-3 border-t-transparent border-r-primary/30 border-b-transparent border-l-transparent"
          animate={{ rotate: -120 }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>
      
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {message}
      </p>
      
      <motion.div 
        className="flex space-x-1 mt-1"
        variants={dotsVariants}
        initial="initial"
        animate="animate"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            variants={dotVariants}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Loading;
