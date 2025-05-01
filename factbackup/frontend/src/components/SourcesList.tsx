
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Globe, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

interface Source {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'study' | 'factCheck' | 'official';
  relevance: 'high' | 'medium' | 'low';
  agreeLevel?: 'supports' | 'contradicts' | 'neutral';
}

interface SourcesListProps {
  isLoading: boolean;
  sources: Source[];
}

const SourcesList: React.FC<SourcesListProps> = ({ isLoading, sources = [] }) => {
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  if (isLoading) {
    return (
      <div className="h-full space-y-4 p-1 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-muted rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (!sources.length) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8 animate-fade-in">
        <div className="space-y-4">
          <Info className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-medium text-foreground">No Sources Yet</h3>
          <p className="text-muted-foreground max-w-md">
            Sources used for verification will appear here after analysis.
          </p>
        </div>
      </div>
    );
  }

  const getSourceIcon = (type: Source['type']) => {
    switch (type) {
      case 'article':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'study':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'factCheck':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'official':
        return <Globe className="h-5 w-5 text-cyan-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSourceTypeText = (type: Source['type']) => {
    switch (type) {
      case 'article':
        return 'News Article';
      case 'study':
        return 'Research Study';
      case 'factCheck':
        return 'Fact Check';
      case 'official':
        return 'Official Source';
      default:
        return 'Unknown';
    }
  };

  const getRelevanceBadge = (relevance: Source['relevance']) => {
    switch (relevance) {
      case 'high':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">High Relevance</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">Medium Relevance</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">Low Relevance</Badge>;
      default:
        return null;
    }
  };

  const getAgreeIcon = (agreeLevel?: Source['agreeLevel']) => {
    switch (agreeLevel) {
      case 'supports':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'contradicts':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'neutral':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getAgreeText = (agreeLevel?: Source['agreeLevel']) => {
    switch (agreeLevel) {
      case 'supports':
        return 'Supports';
      case 'contradicts':
        return 'Contradicts';
      case 'neutral':
        return 'Neutral';
      default:
        return '';
    }
  };

  // Create cards for DisplayCards
  const sourceCards = sources.map(source => ({
    icon: getSourceIcon(source.type),
    title: getSourceTypeText(source.type),
    description: source.title,
    date: getAgreeText(source.agreeLevel),
    iconClassName: `text-${source.type === 'article' ? 'blue' : source.type === 'study' ? 'purple' : source.type === 'factCheck' ? 'green' : 'cyan'}-500`,
    titleClassName: `text-${source.type === 'article' ? 'blue' : source.type === 'study' ? 'purple' : source.type === 'factCheck' ? 'green' : 'cyan'}-500`,
    source: source,
    onClick: () => handleCardClick(source)
  }));

  const handleCardClick = (source: Source) => {
    setSelectedSource(source);
  };

  return (
    <div className="h-full flex flex-col gap-6 p-1 animate-slide-up">
      <div className="flex-grow">
        <DisplayCards cards={sourceCards} />
      </div>
      
      {selectedSource && (
        <Card className="overflow-hidden border-0 shadow-sm glass-effect card-hover mt-4">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0">
                {getSourceIcon(selectedSource.type)}
              </div>
              
              <div className="flex-grow space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground line-clamp-1">{selectedSource.title}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <Badge variant="secondary" className="text-xs px-2 py-0 rounded-sm">
                        {getSourceTypeText(selectedSource.type)}
                      </Badge>
                      
                      {selectedSource.agreeLevel && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            {getAgreeIcon(selectedSource.agreeLevel)}
                            <span>{getAgreeText(selectedSource.agreeLevel)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-2 flex-shrink-0">
                    {getRelevanceBadge(selectedSource.relevance)}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground truncate max-w-[80%]">
                    {selectedSource.url}
                  </span>
                  <a 
                    href={selectedSource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    Visit
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SourcesList;
