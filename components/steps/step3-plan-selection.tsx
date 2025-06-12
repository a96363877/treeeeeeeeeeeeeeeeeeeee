"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Shield, Star, Award, Crown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FormData } from "../insurance-flow"
import { offerData, type InsuranceOffer } from "@/data/data"

interface Step3Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}

export function Step3PlanSelection({ formData, updateFormData, onNext, onBack }: Step3Props) {
  const [selectedOffer, setSelectedOffer] = useState("")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  // Filter offers based on insurance type
  const getFilteredOffers = () => {
    const typeMap = {
      "تأمين جديد": "against-others",
      "نقل الملكية": "against-others",
      "تجديد الوثيقة": "comprehensive",
    }

    const targetType = typeMap[formData.insuranceType as keyof typeof typeMap] || "against-others"
    return offerData
      .filter((offer) => offer.type === targetType)
      .sort((a, b) => Number.parseFloat(a.main_price) - Number.parseFloat(b.main_price))
      .slice(0, 12) // Show top 12 offers
  }

  const filteredOffers = getFilteredOffers()

  const calculateTotalPrice = (offer: InsuranceOffer) => {
    const basePrice = Number.parseFloat(offer.main_price)
    const featuresPrice = selectedFeatures.reduce((total, featureId) => {
      const feature = offer.extra_features.find((f) => f.id === featureId)
      return total + (feature ? feature.price : 0)
    }, 0)
    const expensesTotal = offer.extra_expenses.reduce((total, expense) => total + expense.price, 0)

    return basePrice + featuresPrice + expensesTotal
  }

  const getOfferIcon = (index: number) => {
    const icons = [Crown, Award, Star, Shield, Shield, Shield]
    return icons[index] || Shield
  }

  const getOfferBadge = (index: number) => {
    const badges = ["الأفضل سعراً", "الأكثر شعبية", "موصى به", "", "", ""]
    return badges[index]
  }

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedOffer) {
      const offer = filteredOffers.find((o) => o.id === selectedOffer)
      if (offer) {
        updateFormData({
          selectedPlan: offer.name,
          selectedOfferId: offer.id,
          selectedFeatures,
          totalPrice: calculateTotalPrice(offer).toString(),
        })
        onNext()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h3 className="text-lg font-bold text-emerald-400 mb-2">اختر أفضل عرض تأمين</h3>
          <p className="text-emerald-300 text-sm">مقارنة بين أفضل شركات التأمين في المملكة</p>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredOffers.map((offer, index) => {
            const Icon = getOfferIcon(index)
            const badge = getOfferBadge(index)
            const totalPrice = calculateTotalPrice(offer)

            return (
              <div
                key={offer.id}
                onClick={() => setSelectedOffer(offer.id)}
                className={cn(
                  "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                  selectedOffer === offer.id
                    ? "border-emerald-400 bg-emerald-400/10 shadow-lg"
                    : "border-emerald-700/50 bg-emerald-800/30 hover:border-emerald-600 hover:bg-emerald-800/40",
                )}
              >
                {badge && (
                  <div className="absolute -top-2 right-4 bg-emerald-400 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold">
                    {badge}
                  </div>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white p-1">
                      <img
                        src={offer.company.image_url || "/placeholder.svg"}
                        alt={offer.company.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white capitalize">{offer.name}</h4>
                      <p className="text-emerald-300 text-sm capitalize">{offer.company.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Icon className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-emerald-300">
                          {offer.type === "comprehensive" ? "تأمين شامل" : "ضد الغير"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left">
                    <p className="text-2xl font-bold text-emerald-400">{totalPrice.toFixed(2)} ر.س</p>
                    <p className="text-xs text-emerald-300">سنوياً</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-3">
                  <h5 className="text-sm font-semibold text-emerald-400">المزايا المتاحة:</h5>
                  {offer.extra_features.slice(0, 3).map((feature) => (
                    <div key={feature.id} className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-emerald-200 leading-relaxed">{feature.content}</span>
                      {feature.price > 0 && (
                        <span className="text-xs text-emerald-400 font-semibold">+{feature.price} ر.س</span>
                      )}
                    </div>
                  ))}
                  {offer.extra_features.length > 3 && (
                    <p className="text-xs text-emerald-300">+{offer.extra_features.length - 3} مزايا إضافية</p>
                  )}
                </div>

                {/* Selection indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedOffer === offer.id ? "border-emerald-400 bg-emerald-400" : "border-emerald-600",
                      )}
                    >
                      {selectedOffer === offer.id && <Check className="w-3 h-3 text-emerald-900" />}
                    </div>
                    <span className="text-sm text-emerald-300">اختر هذا العرض</span>
                  </div>

                  {index === 0 && (
                    <div className="flex items-center gap-1 text-emerald-400">
                      <Crown className="w-4 h-4" />
                      <span className="text-xs font-bold">الأفضل</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 border-emerald-700 text-emerald-300 hover:bg-emerald-800/50 h-12"
          >
            السابق
          </Button>
          <Button
            type="submit"
            disabled={!selectedOffer}
            className="flex-1 bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-bold h-12 disabled:opacity-50"
          >
            التالي
          </Button>
        </div>
      </div>
    </form>
  )
}
