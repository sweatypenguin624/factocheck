
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getHistory, HistoryItem } from '@/services/api';
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import ResultsPanel from '@/components/ResultsPanel';

/**
 * History page displaying past fact-checking requests
 * 
 * Features:
 * - Fetches and displays history of fact checks
 * - Elegant loading and error states
 * - Responsive design
 */
const History = () => {
  // State management
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  
  // Hooks
  const { toast } = useToast();

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
      transition: { type: "spring", stiffness: 80, damping: 10 }
    }
  };

  // Fetch history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistoryItems(data);
        if (data.length > 0) {
          setSelectedItem(data[0]);
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Failed to load history';
        
        setError(errorMessage);
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHistory();
  }, [toast]);

  // Show loading state
  if (isLoading) {
    return <Loading message="Loading your history..." />;
  }

  // Show error state
  if (error) {
    return <Error message={error} onRetry={() => window.location.reload()} />;
  }

  // Show empty state
  if (historyItems.length === 0) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Your History</h1>
          <div className="p-8 rounded-xl glassmorphism">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">No history yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Once you start fact-checking, your history will appear here.
            </p>
            <a 
              href="/"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start fact-checking
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Create mock sources for demonstration
  const mockSources = selectedItem ? [
    { title: "Primary Source", description: "Main reference for this fact check", url: "https://example.com/source1" },
    { title: "Supporting Evidence", description: "Additional context and verification", url: "https://example.com/source2" },
    { title: "Related Information", description: "Background on the topic", url: "https://example.com/source3" }
  ] : [];

  return (
    <motion.div 
      className="min-h-screen pt-20 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ContainerScroll
        titleComponent={
          <motion.h1 
            className="text-3xl font-bold mb-6"
            variants={itemVariants}
          >
            Your Fact-Checking History
          </motion.h1>
        }
      >
        <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto p-4">
          {/* Left Panel - History List */}
          <motion.div 
            className="overflow-auto max-h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-4">
              {historyItems.map((item) => (
                <motion.div
                  key={item.id}
                  className={`p-4 rounded-xl glassmorphism cursor-pointer ${selectedItem?.id === item.id ? 'ring-2 ring-primary' : ''}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedItem(item)}
                >
                  <h3 className="text-lg font-medium mb-2">{item.text.slice(0, 80)}{item.text.length > 80 ? '...' : ''}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Panel - Results Display */}
          <div className="overflow-auto max-h-full">
            {selectedItem && (
              <ResultsPanel 
                result={selectedItem.result}
                sources={mockSources}
              />
            )}
          </div>
        </div>
      </ContainerScroll>
    </motion.div>
  );
};

export default History;
