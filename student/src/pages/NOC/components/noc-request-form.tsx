"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, Send, ArrowRight } from "lucide-react"
import { NOCDetailsCard } from "./noc-details-card"
import { ContactInfoCard } from "./contact-info-card"
import { DocumentUploadCard } from "./document-upload-card"
import { useNOCForm } from "../hooks/use-noc-form"
import { submitNOCRequest } from "../api/noc-api"

interface NOCRequestFormProps {
  onSuccess: () => void
}

export function NOCRequestForm({ onSuccess }: NOCRequestFormProps) {
  const { formData, uploadedFiles, isSubmitting, handleInputChange, handleFileUpload, setIsSubmitting } = useNOCForm()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitNOCRequest(formData, uploadedFiles)
      onSuccess()
    } catch (error) {
      console.error("Failed to submit NOC request:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <NOCDetailsCard formData={formData} onInputChange={handleInputChange} />
      <ContactInfoCard formData={formData} onInputChange={handleInputChange} />
      <DocumentUploadCard uploadedFiles={uploadedFiles} onFileUpload={handleFileUpload} />

      {/* Terms and Submit */}
      <Card className="border-2  rounded-2xl overflow-hidden shadow-lg">
        <CardContent className="pt-6 space-y-6 p-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="urgentRequest"
              checked={formData.urgentRequest}
              onChange={(e) => handleInputChange("urgentRequest", e.target.checked)}
              className="rounded-md"
            />
            <label htmlFor="urgentRequest" className="text-sm flex items-center font-medium">
              <div className="w-5 h-5  rounded-full flex items-center justify-center mr-2">
                <Zap className="w-3 h-3 text-white" />
              </div>
              Mark as urgent request (additional charges may apply)
            </label>
          </div>

          <Alert className="border-2  rounded-xl">
            
            <AlertDescription className="text-blue-800 font-medium">
              <strong>Processing Time:</strong> Regular requests: 3-5 business days | Urgent requests: 24-48 hours
            </AlertDescription>
          </Alert>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={formData.agreeTerms}
              onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
              required
              className="rounded-md"
            />
            <label htmlFor="agreeTerms" className="text-sm font-medium">
              I certify that all information provided is accurate and agree to the terms and conditions *
            </label>
          </div>

          <Button
            type="submit"
            disabled={!formData.agreeTerms || isSubmitting}
            className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white rounded-xl h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                Submitting Request...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                Submit NOC Request
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
