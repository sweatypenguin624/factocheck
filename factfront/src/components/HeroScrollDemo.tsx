
"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import NewsInput from "@/components/NewsInput";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-foreground">
              News Credibility Checker <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-gradient">
                Verify Before You Share
              </span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Our AI-powered tool analyzes news content, checks facts, and provides a credibility 
              score to help you determine what's reliable and what's not.
            </p>
          </>
        }
      >
        <div className="h-full flex items-center justify-center p-6">
          <NewsInput 
            onProcessNews={(text) => console.log("Processing:", text)} 
            isLoading={false} 
          />
        </div>
      </ContainerScroll>
    </div>
  );
}
