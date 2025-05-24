import { create } from 'zustand'
import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface UserStore {
  user: User | null
  loading: boolean
  error: string | null
  fetchUserData: (credentials: { email: string; password: string }) => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUserData: async (credentials) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.post<User>('http://localhost:5001/api/user/login', credentials)
      set({ user: response.data, loading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message || 'Unknown error',
        loading: false,
      })
    }
  },
}))
