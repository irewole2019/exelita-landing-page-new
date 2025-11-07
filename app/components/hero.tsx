import { Button } from "@/components/ui/button"

import { Download } from "heroicons-react" // Declare the Download variable before using it

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 sm:py-32">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <Button
          size="lg"
          className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-lg font-semibold text-white shadow-xl transition-all hover:shadow-2xl hover:shadow-blue-500/50"
          asChild
        >
          <a
            href="https://czsewbhys1umv5w9.public.blob.vercel-storage.com/exelita-eb1a-worksheet.pdf"
            download="EB1A-Petition-Builder-Worksheet.pdf"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Free Worksheet
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 transition-opacity group-hover:opacity-20" />
          </a>
        </Button>
      </div>
    </section>
  )
}
