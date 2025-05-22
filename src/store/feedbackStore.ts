// store/feedbackStore.ts (Keep as is from previous response, just ensuring correct endpoint)
import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

interface Parameter {
  id: number;
  parameterName: string;
  parameterType: string;
  courseName: string;
  teacherName: string;
}

interface FeedbackStore {
  parameters: Parameter[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  resetParameters: () => void; // Utility to clear parameters after submission
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  parameters: [],
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication error: No token found. Please log in again.");
        set({ loading: false, error: "Not authenticated" });
        return;
      }

      // This endpoint now fetches only UNsubmitted parameters for the current user
      const response = await axios.get("http://localhost:5000/api/feedback/parameters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ parameters: response.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch parameters", error);
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Error loading questions. Please refresh the page to try again.";
      toast.error(errorMessage);
      set({ error: errorMessage, loading: false });
    }
  },
  resetParameters: () => set({ parameters: [] }),
}));