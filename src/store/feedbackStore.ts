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
