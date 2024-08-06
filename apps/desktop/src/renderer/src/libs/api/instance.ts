import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const setAuthToken = (token: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default instance
