import { CheckCircle, Clock, AlertCircle } from "lucide-react"

export function getStatusColor(status: string): string {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function getStatusIcon(status: string) {
  switch (status) {
    case "approved":
      return CheckCircle
    case "pending":
      return Clock
    case "rejected":
      return AlertCircle
    default:
      return Clock
  }
}
