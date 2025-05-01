import React, { useState } from "react";

interface OutputTextBoxProps {
  resultData: { result: string; sources: { title: string | null; url: string }[] };
}

const OutputTextBox: React.FC<OutputTextBoxProps> = ({ resultData }) => {
  const [isResult, setIsResult] = useState(true);

  const displayContent = isResult
    ? resultData.result
    : resultData.sources.map((source, index) => `${index + 1}. ${source.title || "Source"}: ${source.url}`).join("\n");

  return (
    <div className="p-4 border rounded-lg bg-black shadow">
      <div className="flex justify-between items-center mb-4">
        <span className="text-white font-medium">Result</span>
        <button
          onClick={() => setIsResult(!isResult)}
          className={`w-14 h-7 bg-gray-600 rounded-full p-1 transition-colors duration-300 ease-in-out 
            ${isResult ? "bg-gray-600" : "bg-blue-600"}`}
        >
          <span
            className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out
              ${isResult ? "translate-x-0" : "translate-x-7"}`}
          />
        </button>
        <span className="text-white font-medium">Sources</span>
      </div>
      <textarea
        className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg resize-none focus:outline-none focus:border-blue-500"
        rows={6}
        readOnly
        value={displayContent}
      />
    </div>
  );
};

export default OutputTextBox;