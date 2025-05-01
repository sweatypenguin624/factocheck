
// import React from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";

// type CredibilityLevel = 'high' | 'medium' | 'low' | 'unknown';

// interface AnalysisResultProps {
//   isLoading: boolean;
//   credibilityScore?: number;
//   credibilityLevel?: CredibilityLevel;
//   analysisText?: string;
//   keyPoints?: string[];
// }

// const AnalysisResult: React.FC<AnalysisResultProps> = ({
//   isLoading,
//   credibilityScore = 0,
//   credibilityLevel = 'unknown',
//   analysisText = '',
//   keyPoints = []
// }) => {
//   if (isLoading) {
//     return (
//       <div className="h-full flex items-center justify-center">
//         <div className="space-y-4 w-full max-w-md animate-pulse">
//           <div className="h-6 bg-muted rounded-md w-1/2 mx-auto"></div>
//           <div className="h-4 bg-muted rounded-md w-2/3 mx-auto"></div>
//           <div className="space-y-2">
//             <div className="h-20 bg-muted rounded-md"></div>
//             <div className="h-20 bg-muted rounded-md"></div>
//           </div>
//           <div className="flex justify-center">
//             <div className="h-6 bg-muted rounded-full w-20"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // If no analysis data yet
//   if (credibilityLevel === 'unknown' && !analysisText) {
//     return (
//       <div className="h-full flex items-center justify-center text-center p-8 animate-fade-in">
//         <div className="space-y-4">
//           <Info className="h-12 w-12 text-muted-foreground mx-auto" />
//           <h3 className="text-xl font-medium text-foreground">No Analysis Yet</h3>
//           <p className="text-muted-foreground max-w-md">
//             Enter news content in the text field and click "Verify Credibility" to analyze its credibility.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const getCredibilityIcon = () => {
//     switch (credibilityLevel) {
//       case 'high':
//         return <CheckCircle className="h-6 w-6 text-green-500" />;
//       case 'medium':
//         return <AlertTriangle className="h-6 w-6 text-amber-500" />;
//       case 'low':
//         return <AlertCircle className="h-6 w-6 text-red-500" />;
//       default:
//         return <Info className="h-6 w-6 text-blue-500" />;
//     }
//   };

//   const getCredibilityColor = () => {
//     switch (credibilityLevel) {
//       case 'high':
//         return 'bg-green-50 text-green-600 border-green-200';
//       case 'medium':
//         return 'bg-amber-50 text-amber-600 border-amber-200';
//       case 'low':
//         return 'bg-red-50 text-red-600 border-red-200';
//       default:
//         return 'bg-blue-50 text-blue-600 border-blue-200';
//     }
//   };

//   const getCredibilityText = () => {
//     switch (credibilityLevel) {
//       case 'high':
//         return 'High Credibility';
//       case 'medium':
//         return 'Medium Credibility';
//       case 'low':
//         return 'Low Credibility';
//       default:
//         return 'Credibility Unknown';
//     }
//   };

//   return (
//     <div className="h-full overflow-y-auto animate-slide-up p-1">
//       <div className="space-y-6">
//         <div className="flex items-center justify-center space-x-2">
//           {getCredibilityIcon()}
//           <Badge 
//             variant="outline" 
//             className={`px-3 py-1 text-sm font-medium ${getCredibilityColor()}`}
//           >
//             {getCredibilityText()}
//           </Badge>
//         </div>

//         <Card className="overflow-hidden border-0 shadow-sm glass-effect">
//           <CardContent className="p-6">
//             <h3 className="text-lg font-medium mb-4">Analysis</h3>
//             <p className="text-foreground/90 leading-relaxed mb-6">
//               {analysisText}
//             </p>
            
//             {keyPoints.length > 0 && (
//               <div className="mt-4">
//                 <h4 className="text-sm font-medium mb-2">Key Points</h4>
//                 <ul className="space-y-2">
//                   {keyPoints.map((point, index) => (
//                     <li key={index} className="flex items-start space-x-2">
//                       <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
//                         {index + 1}
//                       </span>
//                       <span className="text-sm text-foreground/80">{point}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         <div className="flex justify-center">
//           <div className="w-full max-w-xs bg-muted/30 rounded-full h-3 overflow-hidden">
//             <div 
//               className={`h-full ${
//                 credibilityLevel === 'high' 
//                   ? 'bg-green-500' 
//                   : credibilityLevel === 'medium' 
//                     ? 'bg-amber-500' 
//                     : 'bg-red-500'
//               }`}
//               style={{ width: `${credibilityScore}%` }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalysisResult;
