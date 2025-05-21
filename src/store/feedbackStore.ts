// src/store/feedbackStore.ts
import { create } from 'zustand'
import axios from 'axios'

interface Parameter {
  id: number
  parameterName: string
  parameterType: string
  courseName: string
  teacherName: string
}

interface EnrichedFeedback {
    id: string
    parameterName: string
    parameterType: string
    courseName: string
    teacherName: string
    rating: number
    comment?: string
    createdAt: Date
  }

interface SubmittedFeedbackStore {
    submittedFeedbackData: EnrichedFeedback[]
    loading: boolean
    fetchSubmittedFeedback: () => Promise<void>
  }

  
interface FeedbackStore {
  parameters: Parameter[]
  loading: boolean
  fetchData: () => Promise<void>
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  parameters: [],
  loading: false,
  fetchData: async () => {
    set({ loading: true })
    try {
      const response = await axios.get('http://localhost:5000/api/feedback/parameters')
      set({ parameters: response.data })
    } catch (error) {
      console.error('Failed to fetch parameters', error)
    } finally {
      set({ loading: false })
    }
  },
}))


export const useSubmittedFeedbackStore = create<SubmittedFeedbackStore>((set) => ({
    submittedFeedbackData: [],
    loading: false,
    fetchSubmittedFeedback: async () => {
      set({ loading: true });
      try {
        const response = await axios.get("http://localhost:5000/api/feedback/all")
        const submittedFeedback = response.data
  
        const enriched = submittedFeedback.map((item: any) => ({
          id: item.id,
          parameterName: item.parameter?.parameterName || "N/A",
          parameterType: item.parameter?.parameterType || "N/A",
          courseName: item.parameter?.courseName || "N/A",
          teacherName: item.parameter?.teacherName || "N/A",
          rating: item.rating,
          comment: item.comment || "",
          createdAt: item.createdAt,
        }))
  
        set({ submittedFeedbackData: enriched })
      } catch (error) {
        console.error("❌ Error fetching submitted feedback:", error)
      } finally {
        set({ loading: false })
      }
    },
  }))