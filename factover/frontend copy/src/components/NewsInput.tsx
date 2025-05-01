import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SearchCheck, Loader2 } from "lucide-react";
import OutputTextBox from "@/components/outputText";

const API_ENDPOINT = "http://127.0.0.1:5000/process";

// Define the expected API response type
interface ApiResponse {
  result: string;
  sources: { title: string | null; url: string }[][]; // Nested array from your API
}

const NewsInput: React.FC = () => {
  const [newsText, setNewsText] = useState("");
  const [resultData, setResultData] = useState<ApiResponse | null>(null); // Replace apiUrl with resultData
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsText.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResultData(null);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newsText }),
        mode: "cors",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorText || response.statusText}`);
      }

      const result: ApiResponse = await response.json();
      setResultData(result); // Store the full result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Failed to analyze news: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1 pt-4 m-0">
          <label htmlFor="news-input" className="text-sm font-medium text-foreground/90 tracking-wide">
            Enter news text to verify
          </label>
          <Textarea
            id="news-input"
            placeholder="Paste or type news content here..."
            className="min-h-[100px] resize-y p-4 text-base leading-relaxed rounded-xl transition-all duration-200
            focus-visible:ring-1 focus-visible:ring-primary/70 focus-visible:border-primary/30 glass-effect"
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-xl button-press flex items-center justify-center gap-2
          bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-medium tracking-wide"
          disabled={isLoading || !newsText.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <SearchCheck className="h-5 w-5" />
              <span>Verify Credibility</span>
            </>
          )}
        </Button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      {resultData && !error && (
        <OutputTextBox resultData={{ result: resultData.result, sources: resultData.sources[0] }} /> // Flatten the nested sources
      )}
    </div>
  );
};

export default NewsInput;