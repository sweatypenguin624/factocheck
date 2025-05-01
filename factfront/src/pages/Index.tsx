import React, { useState } from "react";
import { HeroScrollDemo } from "@/components/HeroScrollDemo";
import { ModeToggle } from "@/components/ModeToggle";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import NewsInput from "@/components/NewsInput";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [newsText, setNewsText] = useState("");

  const handleProcessNews = async (text: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setHasResults(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/30 text-foreground">
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>
      
      <div className="container max-w-6xl mx-auto py-8 px-4 sm:px-6"> {/* Reduced padding for more space */}
        <ResizablePanelGroup direction="horizontal" className="min-h-[70vh]"> {/* Reduced height */}
          <ResizablePanel defaultSize={100} minSize={30}> {/* Adjusted panel size */}
            {!hasResults ? (
              <HeroScrollDemo />
            ) : (
              <div className="glass-effect rounded-2xl p-4 shadow-sm animate-slide-up h-full"> {/* Reduced padding */}
                <NewsInput onProcessNews={handleProcessNews} isLoading={isLoading} />
              </div>
            )}
          </ResizablePanel>
          
          
          
          
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;
