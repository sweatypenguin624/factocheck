
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Info, AlertCircle, CheckCircle } from 'lucide-react';

// Types for the component
interface Source {
  url?: string;
  title?: string;
  description?: string;
}

interface AnalysisResultProps {
  result: string;
  sources?: Source[];
  isLoading?: boolean;
}

/**
 * AnalysisResult Component
 * 
 * Displays the results of a fact-checking analysis with:
 * - Formatted markdown content
 * - Visual indicators for factual accuracy
 * - Smooth animations for a polished UX
 */
const AnalysisResult: React.FC<AnalysisResultProps> = ({ 
  result, 
  sources = [], 
  isLoading = false 
}) => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for child elements
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }
    }
  };

  // Helper function to determine factual status based on result content
  const getFactStatus = (content: string): {
    icon: JSX.Element;
    label: string;
    className: string;
  } => {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('verified') || lowerContent.includes('confirmed')) {
      return {
        icon: <CheckCircle className="w-5 h-5" />,
        label: 'Verified',
        className: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30'
      };
    } else if (lowerContent.includes('false') || lowerContent.includes('misleading')) {
      return {
        icon: <AlertCircle className="w-5 h-5" />,
        label: 'Misleading',
        className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30'
      };
    } else {
      return {
        icon: <Info className="w-5 h-5" />,
        label: 'Informational',
        className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30'
      };
    }
  };

  // Determine fact status based on result content
  const status = getFactStatus(result);

  // Loading state UI
  if (isLoading) {
    return (
      <div className="relative glassmorphism overflow-hidden rounded-xl p-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 mb-6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/6 mb-2"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative glassmorphism overflow-hidden rounded-xl"
    >
      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <motion.div 
          variants={itemVariants}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${status.className}`}
        >
          {status.icon}
          <span className="ml-1.5">{status.label}</span>
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div variants={itemVariants} className="p-6">
        <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
          <ReactMarkdown>
            {result}
          </ReactMarkdown>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalysisResult;
