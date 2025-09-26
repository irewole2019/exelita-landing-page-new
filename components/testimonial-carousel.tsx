"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Research Scientist",
    company: "Stanford University",
    image: "/images/testimonial-1.jpeg",
    rating: 5,
    text: "Exelita helped me build my EB-1A petition in just 3 weeks. The AI guidance was incredibly detailed and helped me highlight achievements I didn't even realize were significant. Approved on first try!",
    category: "EB-1A",
  },
  {
    id: 2,
    name: "Prof. Michael Rodriguez",
    role: "Computer Science Professor",
    company: "MIT",
    image: "/images/testimonial-2.jpeg",
    rating: 5,
    text: "As an outstanding researcher, I was skeptical about using AI for my EB-1B petition. But Exelita's platform understood the nuances of academic achievements better than I expected. Highly recommended!",
    category: "EB-1B",
  },
  {
    id: 3,
    name: "James Thompson",
    role: "VP of Engineering",
    company: "Tech Multinational Corp",
    image: "/images/testimonial-3.jpeg",
    rating: 5,
    text: "The EB-1C process was streamlined and professional. Exelita's expert review caught several important details that strengthened my case significantly. Worth every penny compared to traditional lawyers.",
    category: "EB-1C",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    setIsAutoPlaying(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextTestimonial()
    } else if (isRightSwipe) {
      prevTestimonial()
    }

    // Resume auto-play after 3 seconds
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        ref={carouselRef}
        className="relative overflow-hidden rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <Card className="p-8 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-gray-700 mb-4 italic">"{testimonial.text}"</blockquote>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.role}</div>
                      <div className="text-gray-500 text-sm">{testimonial.company}</div>
                      <div className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {testimonial.category} Success
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={prevTestimonial}
          className="p-2 bg-transparent"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dots indicator */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-purple-600" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextTestimonial}
          className="p-2 bg-transparent"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Swipe indicator for mobile */}
      <div className="md:hidden text-center mt-4">
        <p className="text-sm text-gray-500">← Swipe to see more testimonials →</p>
      </div>
    </div>
  )
}
