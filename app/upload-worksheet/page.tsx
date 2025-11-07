"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"

export default function UploadWorksheetPage() {
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-worksheet", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setBlobUrl(data.url)
        setSuccess(true)
      } else {
        setError(data.error || "Upload failed")
      }
    } catch (err) {
      setError("Upload failed. Please try again.")
      console.error("[v0] Upload error:", err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upload EB-1A Worksheet</CardTitle>
          <CardDescription>Upload the PDF file to Blob storage (413KB PDF)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-slate-400" />
                <p className="text-sm text-slate-600">{uploading ? "Uploading..." : "Click to upload PDF"}</p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>

            {success && blobUrl && (
              <div className="w-full p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900">Upload successful!</p>
                    <p className="text-sm text-green-700 mt-1 break-all">URL: {blobUrl}</p>
                    <p className="text-sm text-green-600 mt-2">
                      ✓ The download button on your homepage will now use this file
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="w-full p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900">Upload failed</p>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {success && (
            <Button asChild className="w-full bg-transparent" variant="outline">
              <a href="/">Go to Homepage</a>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
