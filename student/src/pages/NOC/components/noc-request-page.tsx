
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Zap } from "lucide-react"
// import { BackgroundElements } from "./components/background-elements"
import { PageHeader } from "./page-header"
import { SuccessPage } from "./success-page"
import { NOCRequestForm } from "./noc-request-form"
import { RequestStatus } from "./request-status"

export default function NOCRequestPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSuccess = () => {
    setSubmitSuccess(true)
  }

  const handleNewRequest = () => {
    setSubmitSuccess(false)
  }

  if (submitSuccess) {
    return <SuccessPage onNewRequest={handleNewRequest} />
  }

  return (
    <div className="min-h-screen  overflow-hidden">
      {/* <BackgroundElements /> */}

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <PageHeader />

        <Tabs defaultValue="new-request" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2   border border-gray-800 rounded-2xl p-1 shadow-lg">
            <TabsTrigger
              value="new-request"
              className="data-[state=active]:bg-black data-[state=active]:text-white rounded-xl transition-all duration-300 font-medium"
            >
              <Zap className="w-4 h-4 mr-2" />
              New Request
            </TabsTrigger>
            <TabsTrigger
              value="status"
              className="data-[state=active]:bg-black data-[state=active]:text-white rounded-xl transition-all duration-300 font-medium"
            >
              <Building className="w-4 h-4 mr-2" />
              Request Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new-request" className="space-y-8">
            <NOCRequestForm onSuccess={handleSuccess} />
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <RequestStatus />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
