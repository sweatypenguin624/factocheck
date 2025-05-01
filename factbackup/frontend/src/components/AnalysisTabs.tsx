
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Link } from "lucide-react";
// import AnalysisResult from './AnalysisResult';
import SourcesList from './SourcesList';

// Mock types for our demo data
type CredibilityLevel = 'high' | 'medium' | 'low' | 'unknown';

interface Source {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'study' | 'factCheck' | 'official';
  relevance: 'high' | 'medium' | 'low';
  agreeLevel?: 'supports' | 'contradicts' | 'neutral';
}

interface AnalysisTabsProps {
  isLoading: boolean;
  // Analysis data
  credibilityScore?: number;
  credibilityLevel?: CredibilityLevel;
  analysisText?: string;
  keyPoints?: string[];
  // Sources data
  sources: Source[];
}

const AnalysisTabs: React.FC<AnalysisTabsProps> = ({
  isLoading,
  credibilityScore = 0,
  credibilityLevel = 'unknown',
  analysisText = '',
  keyPoints = [],
  sources = []
}) => {
  const [activeTab, setActiveTab] = useState('output');
  
  return (
    <Tabs 
      defaultValue="output" 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full h-full flex flex-col"
    >
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger 
          value="output" 
          className="tab-transition flex items-center gap-1.5 py-2.5"
          data-state={activeTab === 'output' ? 'active' : 'inactive'}
        >
          <FileText className="h-4 w-4" />
          <span>Output</span>
        </TabsTrigger>
        <TabsTrigger 
          value="sources" 
          className="tab-transition flex items-center gap-1.5 py-2.5"
          data-state={activeTab === 'sources' ? 'active' : 'inactive'}
        >
          <Link className="h-4 w-4" />
          <span>Sources</span>
          {sources.length > 0 && (
            <span className="ml-1 rounded-full bg-primary/10 text-primary text-xs px-1.5 py-0.5 min-w-[1.25rem] text-center">
              {sources.length}
            </span>
          )}
        </TabsTrigger>
      </TabsList>
      
      <div className="flex-grow overflow-hidden">
        <TabsContent 
          value="output" 
          className="mt-0 h-full data-[state=active]:animate-scale-in"
          data-state={activeTab === 'output' ? 'active' : 'inactive'}
        >
          {/* <AnalysisResult
            isLoading={isLoading}
            credibilityScore={credibilityScore}
            credibilityLevel={credibilityLevel}
            analysisText={analysisText}
            keyPoints={keyPoints}
          /> */}
        </TabsContent>
        
        <TabsContent 
          value="sources" 
          className="mt-0 h-full data-[state=active]:animate-scale-in"
          data-state={activeTab === 'sources' ? 'active' : 'inactive'}
        >
          <SourcesList
            isLoading={isLoading}
            sources={sources}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AnalysisTabs;
