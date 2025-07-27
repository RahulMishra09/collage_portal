import type { NOCFormData, NOCRequest, SubmissionResponse, NOCType } from "../types/noc"
import { API_ENDPOINTS } from '../../../api/endpoints'
import { apiRequest } from '../../../api/client'

export async function submitNOCRequest(formData: NOCFormData, files: string[]): Promise<SubmissionResponse> {
  // Adjust payload as needed for your backend
  return apiRequest<SubmissionResponse>(API_ENDPOINTS.noc.submit, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...formData, files }),
  })
}

export async function getNOCRequests(): Promise<NOCRequest[]> {
  try {
    return await apiRequest<NOCRequest[]>(API_ENDPOINTS.noc.requests)
  } catch (err) {
    // Fallback to local JSON if API fails
    const fallbackPath = '/src/pages/NOC/data/mock-requests.json'
    try {
      const fallback = await fetch(fallbackPath).then(res => res.json())
      return fallback
    } catch (fallbackErr) {
      console.error('Failed to fetch NOC requests from API and fallback:', fallbackPath, fallbackErr)
      throw err
    }
  }
}

export async function getNOCTypes(): Promise<NOCType[]> {
  try {
    return await apiRequest<NOCType[]>(API_ENDPOINTS.noc.types)
  } catch (err) {
    // Fallback to local JSON if API fails
    const fallbackPath = '/src/pages/NOC/data/noc-types.json'
    try {
      const fallback = await fetch(fallbackPath).then(res => res.json())
      return fallback
    } catch (fallbackErr) {
      console.error('Failed to fetch NOC types from API and fallback:', fallbackPath, fallbackErr)
      throw err
    }
  }
}

export async function downloadNOC(requestId: string): Promise<Blob> {
  // For file download, you may need to handle response as blob
  const response = await fetch(API_ENDPOINTS.noc.download(requestId))
  if (!response.ok) throw new Error('Failed to download NOC')
  return await response.blob()
}
