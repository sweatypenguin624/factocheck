
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getStats, StatsResponse } from '@/services/api';
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import { Progress } from '@/components/ui/progress';

/**
 * Statistics page showing platform usage data
 * 
 * Features:
 * - Visualizes fact-checking platform statistics
 * - Interactive charts and animations
 * - Responsive design
 */
const Stats = () => {
  // State management
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
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
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  // Fetch stats on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err: unknown) {
        const errorMessage = typeof err === 'object' && err !== null && 'message' in err
          ? String(err.message)
          : 'Failed to load statistics';
        
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
    
    fetchStats();
  }, [toast]);

  // Calculate percentages for visualizations
  const calculateVerifiedPercentage = () => {
    if (!stats) return 0;
    return stats.total_requests > 0 
      ? (stats.verified_facts / stats.total_requests) * 100 
      : 0;
  };
  
  const calculateFailedPercentage = () => {
    if (!stats) return 0;
    return stats.total_requests > 0 
      ? (stats.failed_checks / stats.total_requests) * 100 
      : 0;
  };

  // Show loading state
  if (isLoading) {
    return <Loading message="Loading statistics..." />;
  }

  // Show error state
  if (error) {
    return <Error message={error} onRetry={() => window.location.reload()} />;
  }

  // Show stats
  return (
    <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-3xl font-bold mb-8 text-center"
          variants={itemVariants}
        >
          Platform Statistics
        </motion.h1>
        
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Requests */}
            <motion.div 
              className="p-6 rounded-xl glassmorphism col-span-1 md:col-span-2"
              variants={itemVariants}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Total Fact Checks</h2>
                <BarChart3 className="w-8 h-8 text-primary mt-2 sm:mt-0" />
              </div>
              <p className="text-4xl font-bold text-center my-6">{stats.total_requests.toLocaleString()}</p>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Total number of fact-checking requests processed by the platform.
              </p>
            </motion.div>
            
            {/* Verified Facts */}
            <motion.div 
              className="p-6 rounded-xl glassmorphism"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Verified Facts</h2>
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-3xl font-bold mb-4">{stats.verified_facts.toLocaleString()}</p>
              <Progress value={calculateVerifiedPercentage()} className="h-2 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {calculateVerifiedPercentage().toFixed(1)}% of total requests
              </p>
            </motion.div>
            
            {/* Failed Checks */}
            <motion.div 
              className="p-6 rounded-xl glassmorphism"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Failed Checks</h2>
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-3xl font-bold mb-4">{stats.failed_checks.toLocaleString()}</p>
              <Progress value={calculateFailedPercentage()} className="h-2 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {calculateFailedPercentage().toFixed(1)}% of total requests
              </p>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Stats;
