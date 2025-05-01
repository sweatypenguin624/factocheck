
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalysisResult from '@/components/AnalysisResult';
import DisplayCards from '@/components/ui/display-cards';
import { ExternalLink, Info } from 'lucide-react';

// Types for the component
interface Source {
  url?: string;
  title?: string;
  description?: string;
}

interface ResultsPanelProps {
  result: string;
  sources: Source[];
  isLoading?: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ 
  result, 
  sources = [], 
  isLoading = false 
}) => {
  // Transform sources into card format for DisplayCards
  const sourceCards = sources.map((source, index) => ({
    icon: <ExternalLink className="size-4 text-blue-300" />,
    title: source.title || "Source",
    description: source.description || source.url || "Reference material",
    date: "Cited",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className: `[grid-area:stack] ${index === 0 
      ? "hover:-translate-y-10" 
      : index === 1 
        ? "translate-x-16 translate-y-10 hover:-translate-y-1" 
        : "translate-x-32 translate-y-20 hover:translate-y-10"
    } before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0`,
  }));

  return (
    <div className="h-full w-full flex flex-col">
      {/* Large analysis area at the top */}
      <div className="flex-1 mb-4">
        <div className="p-4 rounded-xl glassmorphism h-full">
          <h2 className="text-xl font-semibold mb-3">Analysis</h2>
          <div className="h-[250px] overflow-auto p-3 bg-background/60 rounded-lg">
            <AnalysisResult 
              result={result} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </div>
      
      {/* Sources and Output tabs below */}
      <div className="flex-1">
        <Tabs defaultValue="sources" className="h-full flex flex-col">
          <TabsList className="justify-start mb-4 px-0">
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sources" className="flex-1 overflow-auto mt-0">
            {sources && sources.length > 0 ? (
              <div className="flex min-h-[200px] w-full items-center justify-center py-6">
                <div className="w-full max-w-3xl">
                  <DisplayCards cards={sourceCards.slice(0, 3)} />
                </div>
              </div>
            ) : (
              <div className="p-6 text-center glassmorphism rounded-xl">
                <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No sources available</h3>
                <p className="text-muted-foreground">
                  Sources will appear here when they're referenced in the analysis.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="output" className="flex-1 overflow-auto mt-0">
            <div className="p-4 rounded-xl glassmorphism h-full">
              <div className="p-3 bg-background/60 rounded-lg">
                <AnalysisResult 
                  result={result} 
                  isLoading={isLoading} 
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResultsPanel;
