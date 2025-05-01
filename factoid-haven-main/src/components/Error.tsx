
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

/**
 * Error component for displaying error states
 * 
 * @param message - The error message to display
 * @param onRetry - Optional callback for retry action
 */
const Error = ({ 
  message = 'Something went wrong. Please try again.', 
  onRetry 
}: ErrorProps) => {
  return (
    <motion.div 
      className="rounded-xl glassmorphism p-6 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
      >
        <AlertTriangle size={24} />
      </motion.div>
      
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Error Encountered
      </h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {message}
      </p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors"
          onClick={onRetry}
        >
          <RefreshCw size={16} className="mr-2" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;
