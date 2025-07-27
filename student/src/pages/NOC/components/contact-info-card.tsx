"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone } from "lucide-react"
import type { NOCFormData } from "../types/noc"

interface ContactInfoCardProps {
  formData: NOCFormData
  onInputChange: (field: keyof NOCFormData, value: string | boolean) => void
}

export function ContactInfoCard({ formData, onInputChange }: ContactInfoCardProps) {
  return (
    <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="pb-4  relative">
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Phone className="w-4 h-4 text-white" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold ">Contact & Parent Information</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Emergency contact and parent details for verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-3">
          <Label htmlFor="address" className="text-sm font-semibold ">
            Current Address *
          </Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => onInputChange("address", e.target.value)}
            placeholder="Enter your complete current address"
            rows={3}
            className="border-2 border-gray-200 hover:border-gray-300 focus:border-green-500 rounded-xl transition-all duration-200 resize-none"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="parentName" className="text-sm font-semibold 0">
              Parent/Guardian Name *
            </Label>
            <Input
              id="parentName"
              value={formData.parentName}
              onChange={(e) => onInputChange("parentName", e.target.value)}
              placeholder="Enter parent/guardian name"
              className="border-2 border-gray-200 hover:border-gray-300 focus:border-green-500 rounded-xl h-12 transition-all duration-200"
              required
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="parentPhone" className="text-sm font-semibold 0">
              Parent/Guardian Phone *
            </Label>
            <Input
              id="parentPhone"
              value={formData.parentPhone}
              onChange={(e) => onInputChange("parentPhone", e.target.value)}
              placeholder="+91 9876543210"
              className="border-2 border-gray-200 hover:border-gray-300 focus:border-green-500 rounded-xl h-12 transition-all duration-200"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
