"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText } from "lucide-react"
import { getNOCTypes } from "../api/noc-api"
import type { NOCFormData, NOCType } from "../types/noc"

interface NOCDetailsCardProps {
  formData: NOCFormData
  onInputChange: (field: keyof NOCFormData, value: string | boolean) => void
}

export function NOCDetailsCard({ formData, onInputChange }: NOCDetailsCardProps) {
  const [nocTypes, setNocTypes] = useState<NOCType[]>([])

  useEffect(() => {
    const fetchNOCTypes = async () => {
      try {
        const types = await getNOCTypes()
        setNocTypes(types)
      } catch (error) {
        console.error("Failed to fetch NOC types:", error)
      }
    }

    fetchNOCTypes()
  }, [])

  return (
    <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r  relative">
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold ">NOC Request Details</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">Tell us what you need and why you need it</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-3">
          <Label htmlFor="nocType" className="text-sm font-semibold ">
            Type of NOC Required *
          </Label>
          <Select onValueChange={(value) => onInputChange("nocType", value)}>
            <SelectTrigger className="border-2 border-gray-200 hover:border-gray-300 rounded-xl h-12 transition-all duration-200">
              <SelectValue placeholder="Choose your NOC type" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2">
              {nocTypes.map((type) => (
                <SelectItem key={type.value} value={type.value} className="rounded-lg my-1">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 bg-gradient-to-br ${type.gradient} rounded-lg flex items-center justify-center text-white text-sm`}
                    >
                      {type.icon}
                    </div>
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-gray-500">{type.desc}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="purpose" className="text-sm font-semibold ">
              Specific Purpose *
            </Label>
            <Input
              id="purpose"
              value={formData.purpose}
              onChange={(e) => onInputChange("purpose", e.target.value)}
              placeholder="e.g., Job at XYZ Company"
              className="border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 rounded-xl h-12 transition-all duration-200"
              required
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="organizationName" className="text-sm font-semibold ">
              Organization Name
            </Label>
            <Input
              id="organizationName"
              value={formData.organizationName}
              onChange={(e) => onInputChange("organizationName", e.target.value)}
              placeholder="Name of company/institution"
              className="border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 rounded-xl h-12 transition-all duration-200"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="requiredDate" className="text-sm font-semibold ">
            Required By Date *
          </Label>
          <Input
            id="requiredDate"
            type="date"
            value={formData.requiredDate}
            onChange={(e) => onInputChange("requiredDate", e.target.value)}
            className="border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 rounded-xl h-12 transition-all duration-200"
            required
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="reason" className="text-sm font-semibold ">
            Detailed Reason *
          </Label>
          <Textarea
            id="reason"
            value={formData.reason}
            onChange={(e) => onInputChange("reason", e.target.value)}
            placeholder="Please provide a detailed explanation of why you need this NOC..."
            rows={4}
            className="border-2 border-gray-200 hover:border-gray-300 focus:border-blue-500 rounded-xl transition-all duration-200 resize-none"
            required
          />
        </div>
      </CardContent>
    </Card>
  )
}
