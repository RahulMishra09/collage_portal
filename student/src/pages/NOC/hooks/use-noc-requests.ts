"use client"

import { useState, useEffect } from "react"
import type { NOCRequest } from "../types/noc"
import { getNOCRequests } from "../api/noc-api"

export function useNOCRequests() {
  const [requests, setRequests] = useState<NOCRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const data = await getNOCRequests()
      setRequests(data)
    } catch (err) {
      setError("Failed to fetch requests")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return { requests, loading, error, refetch: fetchRequests }
}
