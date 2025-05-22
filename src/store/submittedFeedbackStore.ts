// store/submittedFeedbackStore.ts
import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';

// Define the type for a single submitted feedback item
interface SubmittedFeedbackItem {
  id: number;
  userId: number;
  parameterId: number;
  rating: number;
  comment?: string;
  submittedAt: string; // ISO date string
  parameter: { // Assuming your backend includes parameter details
    id: number;
    parameterName: string;
    parameterType: string;
    courseName: string;
    teacherName: string;
  };
}


interface SubmittedFeedbackStore {
  submittedFeedbacks: SubmittedFeedbackItem[];
  loading: boolean;
  error: string | null;
  fetchSubmittedFeedback: () => Promise<void>;
  clearSubmittedFeedback: () => void;
}

export const useSubmittedFeedbackStore = create<SubmittedFeedbackStore>((set) => ({
  submittedFeedbacks: [],
  loading: false,
  error: null,
  fetchSubmittedFeedback: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication error: No token found. Please log in again.');
        set({ loading: false, error: 'Not authenticated' });
        return;
      }

      const response = await axios.get('http://localhost:5000/api/feedback/view-feedback', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ submittedFeedbacks: response.data.data, loading: false }); // Access .data.data as your backend sends { data: [...] }
    } catch (error) {
      console.error('Failed to fetch submitted feedback', error);
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Error loading submitted feedback. Please try again.';
      toast.error(errorMessage);
      set({ error: errorMessage, loading: false });
    }
  },
  clearSubmittedFeedback: () => set({ submittedFeedbacks: [] }),
}));