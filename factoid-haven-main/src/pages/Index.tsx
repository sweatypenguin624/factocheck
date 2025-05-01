
import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { processFactCheck, ProcessResponse } from '@/services/api';
import AnalysisResult from '@/components/AnalysisResult';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import DisplayCards from '@/components/ui/display-cards';

/**
 * Homepage with fact-checking form
 * 
 * Features:
 * - Text input for claim submission
 * - Real-time validation
 * - Elegant loading states
 * - Results display with animations
 */
const Index = () => {
  // State management
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessResponse | null>(null);
  
  // Hooks
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    
    // Clear previous results
    setError(null);
    setResult(null);
    setIsLoading(true);
    
    try {
      // Process fact check
      const response = await processFactCheck(inputText);
      setResult(response);
      
      // Show success toast
      toast({
        title: "Analysis complete",
        description: "Your content has been successfully analyzed.",
      });
    } catch (err: unknown) {
      // Handle errors
      const errorMessage = typeof err === 'object' && err !== null && 'message' in err
        ? String(err.message)
        : 'An unknown error occurred';
      setError(errorMessage);
      
      toast({
        title: "Analysis failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  // Source cards for animation
  const sourceCards = result && result.sources ? result.sources.map((source: any, index: number) => ({
    icon: <Check className="size-4 text-green-300" />,
    title: `Source ${index + 1}`,
    description: source.title || "Verified source",
    date: source.date || "Verified",
    iconClassName: "text-green-500",
    titleClassName: "text-green-500",
    className: `[grid-area:stack] ${index % 3 === 0 ? 'hover:-translate-y-10' : index % 3 === 1 ? 'translate-x-16 translate-y-10 hover:-translate-y-1' : 'translate-x-32 translate-y-20 hover:translate-y-10'} before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0`,
  })) : [];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header section */}
        <motion.div 
          className="text-center mb-10"
          variants={itemVariants}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
            Verify Facts with Precision
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enter any claim or statement to verify its accuracy through our advanced fact-checking system.
          </p>
        </motion.div>

        {/* Input form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="mb-8 glassmorphism rounded-xl"
          variants={itemVariants}
        >
          <div className="p-6">
            <label 
              htmlFor="content" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Enter text to analyze
            </label>
            
            <textarea
              id="content"
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="Enter a statement, claim, or text to fact-check..."
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                // Clear error when user starts typing
                if (error) setError(null);
              }}
            />
          </div>
          
          {/* Form actions */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 rounded-b-xl">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:pointer-events-none"
            >
              <Check size={16} className="mr-2" />
              Verify Facts
            </motion.button>
          </div>
        </motion.form>

        {/* Error state */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Error 
                message={error} 
                onRetry={() => {
                  setError(null);
                  handleSubmit({ preventDefault: () => {} } as FormEvent);
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading state */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Loading message="Analyzing content and verifying facts..." />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && !isLoading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Analysis Results
                </h2>
                <AnalysisResult 
                  result={result.result} 
                  sources={result.sources} 
                />
              </div>

              {/* Sources cards with animation */}
              {sourceCards.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 mb-12"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6 text-center">
                    Verified Sources
                  </h3>
                  <DisplayCards cards={sourceCards} />
                </motion.div>
              )}

              {/* Call to action */}
              <motion.div 
                className="text-center mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Want to view your past fact checks? 
                  <a href="/history" className="text-primary ml-1 hover:underline">
                    Visit your history
                  </a>
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Index;
