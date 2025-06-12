"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { FormData } from "../insurance-flow"

interface Step1Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export function Step1BasicInfo({ formData, updateFormData, onNext }: Step1Props) {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { id: 0, name: "تأمين جديد", value: "تأمين جديد" },
    { id: 1, name: "نقل الملكية", value: "نقل الملكية" },
    { id: 2, name: "تجديد الوثيقة", value: "تجديد الوثيقة" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateFormData({ insuranceType: tabs[activeTab].value })
    onNext()
  }

  return (
    <>
      {/* Tab Navigation */}
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              updateFormData({ insuranceType: tab.value })
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-2 text-sm font-medium transition-all duration-300",
              activeTab === tab.id
                ? "bg-emerald-400 text-emerald-900"
                : "bg-emerald-800/60 text-emerald-300 hover:bg-emerald-800/80",
            )}
          >
            {activeTab === tab.id && (
              <div className="w-5 h-5 bg-emerald-900 rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
              </div>
            )}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4 animate-fadeIn">
          {activeTab === 0 && (
            <>
              <Input
                placeholder="الرقم التسلسلي"
                value={formData.serialNumber}
                onChange={(e) => updateFormData({ serialNumber: e.target.value })}
                className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
                required
                type="tel"
                maxLength={12}
                dir="rtl"
              />
              <Input
                placeholder="رقم الهوية / رقم الإقامة"
                value={formData.idNumber}
                onChange={(e) => updateFormData({ idNumber: e.target.value })}
                className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
                required
                type="tel"
                maxLength={12}
                dir="rtl"
              />
              <Input
                placeholder="شهر / سنة الميلاد"
                value={formData.birthDate}
                onChange={(e) => updateFormData({ birthDate: e.target.value })}
                className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
                required
                type="date"
                dir="rtl"
              />
            </>
          )}

          {activeTab === 1 && (
            <Input
              placeholder="رقم الهوية / رقم الإقامة"
              value={formData.idNumber}
              onChange={(e) => updateFormData({ idNumber: e.target.value })}
              className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
              required
              type="tel"
              maxLength={12}
              dir="rtl"
            />
          )}

          {activeTab === 2 && (
            <>
              <Input
                placeholder="رقم الهوية / رقم الإقامة"
                value={formData.idNumber}
                onChange={(e) => updateFormData({ idNumber: e.target.value })}
                className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
                required
                type="tel"
                maxLength={12}
                dir="rtl"
              />
              <Input
                placeholder="رقم الوثيقة"
                className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
                required
                type="tel"
                maxLength={12}
                dir="rtl"
              />
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-bold h-12 text-lg"
          >
            التالي
          </Button>
        </div>
      </form>
    </>
  )
}
