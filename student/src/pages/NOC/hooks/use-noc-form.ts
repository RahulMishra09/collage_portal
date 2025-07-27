"use client"

import type React from "react"

import { useState } from "react"
import type { NOCFormData } from "../types/noc"

const initialFormData: NOCFormData = {
  nocType: "",
  purpose: "",
  requiredDate: "",
  organizationName: "",
  address: "",
  parentName: "",
  parentPhone: "",
  reason: "",
  urgentRequest: false,
  agreeTerms: false,
}

export function useNOCForm() {
  const [formData, setFormData] = useState<NOCFormData>(initialFormData)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (field: keyof NOCFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name)
      setUploadedFiles((prev) => [...prev, ...fileNames])
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setUploadedFiles([])
    setIsSubmitting(false)
    setSubmitSuccess(false)
  }

  return {
    formData,
    uploadedFiles,
    isSubmitting,
    submitSuccess,
    handleInputChange,
    handleFileUpload,
    setIsSubmitting,
    setSubmitSuccess,
    resetForm,
  }
}
