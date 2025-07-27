import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, Eye, Download, Calendar } from "lucide-react"
import { useNOCRequests } from "../hooks/use-noc-requests"
import { getStatusColor, getStatusIcon } from "../utils/status-helpers"

export function RequestStatus() {
  const { requests, loading, error } = useNOCRequests()

  if (loading) {
    return (
      <Card className="border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
        <CardContent className="p-6">
          <p className="text-red-600 text-center">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
      <CardHeader className="pb-4 ">
        <CardTitle className="flex items-center text-xl font-bold">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
            <Building className="w-4 h-4 text-white" />
          </div>
          Request History
        </CardTitle>
        <CardDescription>Track the status of your NOC requests</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {requests.map((request) => {
            const StatusIcon = getStatusIcon(request.status)

            return (
              <div
                key={request.id}
                className="border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg group-hover:text-blue-600 transition-colors">
                      {request.purpose}
                    </h3>
                    <p className="text-sm text-gray-500 font-mono px-2 py-1 rounded-lg inline-block mt-1">
                      {request.id}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(request.status)} border-2 px-3 py-1 rounded-xl font-medium`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="ml-2 capitalize">{request.status}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div className="bg-gray-50 dark:bg-zinc-950 rounded-xl p-3">
                    <span className=" block mb-1">Type</span>
                    <p className="font-semibold ">{request.type}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-zinc-950 rounded-xl p-3">
                    <span className=" block mb-1">Submitted</span>
                    <p className="font-semibold  flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(request.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-zinc-950 rounded-xl p-3">
                    <span className=" block mb-1">
                      {request.status === "approved" ? "Approved" : "Status"}
                    </span>
                    <p className="font-semibold ">
                      {request.approvedDate
                        ? new Date(request.approvedDate).toLocaleDateString()
                        : request.status === "rejected"
                          ? "Not approved"
                          : "Under review"}
                    </p>
                  </div>
                </div>

                {request.status === "rejected" && request.rejectionReason && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl">
                    <p className="text-sm text-red-800 font-medium">
                      <strong>Rejection Reason:</strong> {request.rejectionReason}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-300 group bg-transparent"
                  >
                    <Eye className="w-3 h-3 mr-2 group-hover:scale-110 transition-transform" />
                    View Details
                  </Button>
                  {request.status === "approved" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 rounded-xl transition-all duration-300 group bg-transparent"
                    >
                      <Download className="w-3 h-3 mr-2 group-hover:scale-110 transition-transform" />
                      Download NOC
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
