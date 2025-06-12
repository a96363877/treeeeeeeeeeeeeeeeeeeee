"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  number: number
  title: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                currentStep > step.number
                  ? "bg-emerald-400 text-emerald-900"
                  : currentStep === step.number
                    ? "bg-emerald-400 text-emerald-900 ring-4 ring-emerald-400/30"
                    : "bg-emerald-800/50 text-emerald-300 border-2 border-emerald-700",
              )}
            >
              {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
            </div>
            <div className="mt-2 text-center">
              <div
                className={cn(
                  "text-xs font-medium",
                  currentStep >= step.number ? "text-emerald-400" : "text-emerald-300/70",
                )}
              >
                {step.title}
              </div>
              <div className="text-xs text-emerald-300/50">{step.description}</div>
            </div>
          </div>

          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-4 transition-all duration-300",
                currentStep > step.number ? "bg-emerald-400" : "bg-emerald-800/50",
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
