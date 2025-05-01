
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { processFactCheck } from '@/services/api';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import ResultsPanel from '@/components/ResultsPanel';

const Index = () => {
  // State management
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to fact-check.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const data = await processFactCheck(inputText);
      setResult(data.result);
      setSources(data.sources || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to process fact-check';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      setResult('');
      setSources([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <ContainerScroll
        titleComponent={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Fact<span className="text-primary">Check</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Verify information with AI-powered fact checking
            </p>
          </motion.div>
        }
      >
        <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto p-4">
          {/* Left Panel - Input Form */}
          <div className="overflow-auto max-h-full">
            <Card className="p-6 glassmorphism">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Enter text to analyze
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Search className="h-5 w-5" />
                    </div>
                    <Input
                      className="pl-10 h-auto py-3"
                      placeholder="Enter a claim, statement, or news headline..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Checking..." : "Check Facts"}
                    {!isLoading && <Send className="ml-2 h-4 w-4" />}
                  </Button>
                  
                  <div className="text-xs text-center text-muted-foreground">
                    <AlertTriangle className="inline h-3 w-3 mr-1" />
                    Always verify important information from multiple sources
                  </div>
                </div>
              </form>
            </Card>
          </div>

          {/* Right Panel - Results Display */}
          <div className="overflow-auto max-h-full">
            <ResultsPanel 
              result={result}
              sources={sources}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
};

export default Index;
