export interface NOCFormData {
  nocType: string
  purpose: string
  requiredDate: string
  organizationName: string
  address: string
  parentName: string
  parentPhone: string
  reason: string
  urgentRequest: boolean
  agreeTerms: boolean
}

export interface NOCType {
  value: string
  label: string
  desc: string
  icon: string
  gradient: string
}

export interface NOCRequest {
  id: string
  type: string
  purpose: string
  status: "approved" | "pending" | "rejected"
  submittedDate: string
  approvedDate: string | null
  rejectionReason?: string
}

export interface SubmissionResponse {
  success: boolean
  requestId: string
  message: string
}
