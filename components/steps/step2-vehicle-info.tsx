"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FormData } from "../insurance-flow"

interface Step2Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function Step2VehicleInfo({ formData, updateFormData, onNext, onBack }: Step2Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-4 animate-fadeIn">
        <h3 className="text-lg font-bold text-emerald-400 mb-4">بيانات المركبة</h3>

        <Select onValueChange={(value) => updateFormData({ vehicleType: value })}>
          <SelectTrigger className="bg-emerald-800/50 border-emerald-700/50 text-white h-12">
            <SelectValue placeholder="نوع المركبة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedan">سيدان</SelectItem>
            <SelectItem value="suv">دفع رباعي</SelectItem>
            <SelectItem value="hatchback">هاتشباك</SelectItem>
            <SelectItem value="pickup">بيك أب</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="موديل المركبة"
          value={formData.vehicleModel}
          onChange={(e) => updateFormData({ vehicleModel: e.target.value })}
          className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
          required
        />

        <Select onValueChange={(value) => updateFormData({ vehicleYear: value })}>
          <SelectTrigger className="bg-emerald-800/50 border-emerald-700/50 text-white h-12">
            <SelectValue placeholder="سنة الصنع" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => 2024 - i).map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="قيمة المركبة (ريال سعودي)"
          value={formData.vehicleValue}
          onChange={(e) => updateFormData({ vehicleValue: e.target.value })}
          className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
          type="number"
          required
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 border-emerald-700 text-emerald-300 hover:bg-emerald-800/50 h-12"
          >
            السابق
          </Button>
          <Button type="submit" className="flex-1 bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-bold h-12">
            التالي
          </Button>
        </div>
      </div>
    </form>
  )
}
