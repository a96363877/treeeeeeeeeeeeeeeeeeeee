"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Car, User, Shield, Edit, Star } from "lucide-react"
import type { FormData } from "../insurance-flow"
import Image from "next/image"
import { offerData } from "@/data/data"

interface Step4Props {
  formData: FormData
  onNext: () => void
  onBack: () => void
}

export function Step4Review({ formData, onNext, onBack }: Step4Props) {
  const selectedOffer = offerData.find((offer) => offer.id === formData.selectedOfferId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-6 animate-fadeIn">
        <h3 className="text-lg font-bold text-emerald-400 mb-4">مراجعة البيانات</h3>

        {/* Personal Information */}
        <div className="bg-emerald-800/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-emerald-400" />
            <h4 className="font-semibold text-emerald-400">المعلومات الشخصية</h4>
            <Edit className="w-4 h-4 text-emerald-300 mr-auto cursor-pointer" />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300">نوع الخدمة:</span>
              <span className="text-white">{formData.insuranceType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300">رقم الهوية:</span>
              <span className="text-white">{formData.idNumber}</span>
            </div>
            {formData.serialNumber && (
              <div className="flex justify-between">
                <span className="text-emerald-300">الرقم التسلسلي:</span>
                <span className="text-white">{formData.serialNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-emerald-800/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Car className="w-5 h-5 text-emerald-400" />
            <h4 className="font-semibold text-emerald-400">بيانات المركبة</h4>
            <Edit className="w-4 h-4 text-emerald-300 mr-auto cursor-pointer" />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300">نوع المركبة:</span>
              <span className="text-white">{formData.vehicleType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300">الموديل:</span>
              <span className="text-white">{formData.vehicleModel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300">سنة الصنع:</span>
              <span className="text-white">{formData.vehicleYear}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300">القيمة:</span>
              <span className="text-white">{formData.vehicleValue} ر.س</span>
            </div>
          </div>
        </div>

        {/* Selected Insurance Plan */}
        {selectedOffer && (
          <div className="bg-emerald-800/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h4 className="font-semibold text-emerald-400">العرض المختار</h4>
              <Edit className="w-4 h-4 text-emerald-300 mr-auto cursor-pointer" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white p-1">
                <img
                  src={selectedOffer.company.image_url || "/placeholder.svg"}
                  alt={selectedOffer.company.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h5 className="font-semibold text-white capitalize">{selectedOffer.name}</h5>
                <p className="text-emerald-300 text-sm capitalize">{selectedOffer.company.name}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-emerald-300">نوع التغطية:</span>
                <span className="text-white">{selectedOffer.type === "comprehensive" ? "تأمين شامل" : "ضد الغير"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">القسط الأساسي:</span>
                <span className="text-white">{selectedOffer.main_price} ر.س</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h6 className="text-sm font-semibold text-emerald-400 mb-2">المزايا المشمولة:</h6>
              <div className="space-y-1">
                {selectedOffer.extra_features.slice(0, 3).map((feature) => (
                  <div key={feature.id} className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-emerald-200">{feature.content}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-emerald-700/50">
              <span className="text-emerald-300 font-semibold">المجموع النهائي:</span>
              <span className="text-2xl font-bold text-emerald-400">
                {formData.totalPrice || selectedOffer.main_price} ر.س
              </span>
            </div>
          </div>
        )}

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
            المتابعة للدفع
          </Button>
        </div>
      </div>
    </form>
  )
}
