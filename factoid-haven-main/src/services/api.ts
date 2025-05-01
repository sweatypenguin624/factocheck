
import axios, { AxiosError } from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:5000'; // Replace with actual backend URL in production
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for API responses
export interface ProcessResponse {
  result: string;
  sources: any[];
}

export interface HistoryItem {
  id: string;
  text: string;
  result: string;
  timestamp: string;
}

export interface HistoryResponse {
  history: HistoryItem[];
}

export interface StatsResponse {
  total_requests: number;
  verified_facts: number;
  failed_checks: number;
}

// Error handling helper
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    const message = axiosError.response?.data || axiosError.message;
    
    // Format error message based on status code
    if (status === 404) {
      throw new Error('Resource not found. Please check your request.');
    } else if (status === 401 || status === 403) {
      throw new Error('Authentication error. Please log in again.');
    } else if (status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else if (status && status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    throw new Error(`API Error: ${message}`);
  }
  
  throw new Error('An unexpected error occurred.');
};

// API functions
/**
 * Process text for fact checking
 * @param text - The text to analyze
 * @returns Promise with processing results
 */
export const processFactCheck = async (text: string): Promise<ProcessResponse> => {
  try {
    // Simple JSON request
    const response = await api.post<ProcessResponse>('/process', { text });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get history of fact checking requests
 * @returns Promise with history items
 */
export const getHistory = async (): Promise<HistoryItem[]> => {
  try {
    const response = await api.get<HistoryResponse>('/history');
    return response.data.history;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get platform statistics
 * @returns Promise with statistics data
 */
export const getStats = async (): Promise<StatsResponse> => {
  try {
    const response = await api.get<StatsResponse>('/stats');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export default {
  processFactCheck,
  getHistory,
  getStats,
};
