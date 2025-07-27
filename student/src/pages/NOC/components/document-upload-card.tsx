"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Sparkles } from "lucide-react"

interface DocumentUploadCardProps {
  uploadedFiles: string[]
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function DocumentUploadCard({ uploadedFiles, onFileUpload }: DocumentUploadCardProps) {
  return (
    <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r  relative">
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Upload className="w-4 h-4 text-white" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold">Supporting Documents</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">Upload relevant documents to support your request</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="border-2 border-dashed border-gray-300 hover:border-purple-400 rounded-2xl p-8 text-center transition-all duration-300 hover:bg-purple-50 group">
          <div className="relative">
            <Upload className="w-12 h-12 text-gray-400 group-hover:text-purple-500 mx-auto mb-4 transition-all duration-300 group-hover:scale-110" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse">
              <Sparkles className="w-2 h-2 text-white m-1" />
            </div>
          </div>
          <p className="text-gray-600 group-hover:text-purple-600 mb-2 font-medium transition-colors">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-xs text-gray-500 mb-6">PDF, JPG, PNG up to 5MB each</p>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={onFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("file-upload")?.click()}
            className="border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 rounded-xl px-6 py-3 transition-all duration-300 group-hover:scale-105"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Files
          </Button>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <Label className="text-sm font-semibold ">Uploaded Files:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl px-4 py-3 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm  font-medium truncate">{file}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
