import React, { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Upload, Download, RotateCcw, Image as ImageIcon } from 'lucide-react'
import { AIService } from '../../lib/aiServices'

export default function BackgroundRemover({ onClose }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('Image size must be less than 10MB')
        return
      }

      setSelectedImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      
      // Reset processed image
      setProcessedImage(null)
      setResult(null)
    }
  }

  const handleRemoveBackground = async () => {
    if (!selectedImage) {
      alert('Please select an image first')
      return
    }

    setLoading(true)
    try {
      const response = await AIService.removeBackground(selectedImage)
      setProcessedImage(response.processedImage)
      setResult(response)
    } catch (error) {
      alert(`Background removal error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!processedImage) return

    const link = document.createElement('a')
    link.href = processedImage
    link.download = `no-background-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleReset = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setProcessedImage(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className="w-full bg-white">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-purple-600" />
            <CardTitle className="text-2xl">Image Background Remover</CardTitle>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ✕
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Upload Section */}
        {!imagePreview && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Click to upload an image
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, or WebP (Max 10MB)
              </p>
            </label>
          </div>
        )}

        {/* Image Preview & Processing */}
        {imagePreview && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original Image */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Original Image</div>
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <img
                    src={imagePreview}
                    alt="Original"
                    className="w-full h-64 object-contain"
                  />
                </div>
              </div>

              {/* Processed Image */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">
                  {processedImage ? 'Background Removed' : 'Preview'}
                </div>
                <div className="border-2 border-purple-200 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  {processedImage ? (
                    <img
                      src={processedImage}
                      alt="Processed"
                      className="w-full h-64 object-contain"
                    />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Processed image will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Process Button */}
            {!processedImage && (
              <Button
                onClick={handleRemoveBackground}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing Image...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Remove Background
                  </>
                )}
              </Button>
            )}

            {/* Results */}
            {result && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-green-600">
                  <span className="text-2xl">✓</span>
                  <span className="font-medium">Background Removed Successfully</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-gray-500">Original Size</div>
                    <div className="font-medium text-blue-600">{result.originalSize}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-gray-500">New Size</div>
                    <div className="font-medium text-green-600">{result.processedSize}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-gray-500">Time</div>
                    <div className="font-medium text-purple-600">{result.processingTime}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button onClick={handleDownload} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                  </Button>
                  <Button onClick={handleReset} variant="outline" className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Process New Image
                  </Button>
                </div>
              </div>
            )}

            {/* Reset Button (when no result) */}
            {!result && !loading && (
              <Button onClick={handleReset} variant="outline" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Choose Different Image
              </Button>
            )}
          </div>
        )}

        {/* Demo Notice */}
        <div className="text-center">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Demo Mode - Simulated Processing
          </Badge>
          <p className="text-xs text-gray-500 mt-2">
            This is a demonstration. Real background removal requires API integration.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

