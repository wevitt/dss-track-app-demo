import axios, { AxiosInstance } from 'axios'

let api: AxiosInstance

export function createApi() {
  console.log(import.meta.env.VITE_API_BASE_URL)
  // Qui settiamo la URL delle api per le richieste usando il valore nel file .env
  api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  })
  return api
}

export function useApi() {
  if (!api) {
    createApi()
  }
  return api
}
