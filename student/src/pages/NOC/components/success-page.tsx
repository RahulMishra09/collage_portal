"use client"

import { CheckCircle, Download, Send, Sparkles, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessPageProps {
  onNewRequest: () => void
}

export function SuccessPage({ onNewRequest }: SuccessPageProps) {
  const requestId = `NOC-2024-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-50 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-2xl mx-auto pt-20 px-4 relative z-10">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-green-200 animate-bounce">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            Request Submitted Successfully! 🎉
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Your NOC request is now in our system and being processed with care.
          </p>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-500 text-sm block mb-1">Request ID</span>
                <p className="font-mono font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {requestId}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-500 text-sm block mb-1">Processing Time</span>
                <p className="font-bold text-lg">3-5 business days</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={onNewRequest}
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              Submit Another Request
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-300 hover:border-gray-400 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group bg-transparent"
            >
              <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Download Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
