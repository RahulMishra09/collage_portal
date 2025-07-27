
export function PageHeader() {
  return (
    <div className="text-center mb-12">
      <div className="relative inline-block mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900  to-gray-900 dark:from-zinc-50 dark:to-zinc-200 bg-clip-text text-transparent">
          NOC Request Portal
        </h1>
        {/* <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin">
          <Star className="w-3 h-3 text-white" />
        </div> */}
      </div>
      <p className="text-gray-600 dark:text-zinc-300 text-lg max-w-2xl mx-auto">
        Submit your No Objection Certificate request with ease. We've streamlined the process to make it as simple as
        possible.
      </p>
    </div>
  )
}
