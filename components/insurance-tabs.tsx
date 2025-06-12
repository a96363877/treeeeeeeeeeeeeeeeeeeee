"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface InsuranceTabsProps {
  onSubmit: (e: React.FormEvent) => Promise<void>
  isLoading: boolean
}

export function InsuranceTabs({ onSubmit, isLoading }: InsuranceTabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      id: 0,
      name: "تأمين جديد",
    },
    {
      id: 1,
      name: "نقل الملكية",
    },
    {
      id: 2,
      name: "تجديد الوثيقة",
    },
  ]

  return (
    <div className="bg-emerald-900/80 rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/50 backdrop-blur-sm">
      {/* Tab Navigation */}
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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
      <form onSubmit={onSubmit} className="p-4">
        {/* New Insurance Form */}
        {activeTab === 0 && (
          <div className="space-y-4 animate-fadeIn">
            <Input
              placeholder="الرقم التسلسلي"
              className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
              required
              type="tel"
              maxLength={12}
              dir="rtl"
            />
            <Input
              placeholder="رقم الهوية / رقم الإقامة"
              className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
              required
            />
            <Input
              placeholder="شهر / سنة الميلاد"
              className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-bold h-12 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-emerald-900/30 border-t-emerald-900 rounded-full animate-spin"></div>
                  جاري المعالجة...
                </div>
              ) : (
                "أمن سيارتك"
              )}
            </Button>
          </div>
        )}

        {/* Transfer Ownership Form */}
        {activeTab === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <Input
              placeholder="رقم الهوية / رقم الإقامة"
              className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-bold h-12 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-emerald-900/30 border-t-emerald-900 rounded-full animate-spin"></div>
                  جاري المعالجة...
                </div>
              ) : (
                "أمن سيارتك"
              )}
            </Button>
          </div>
        )}

        {/* Renew Policy Form */}
        {activeTab === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <Input
              placeholder="رقم الهوية / رقم الإقامة"
              className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
              required
            />
            <Input
              placeholder="رقم الوثيقة"
              className="bg-emerald-800/50 border-emerald-700/50 text-white placeholder:text-emerald-300 h-12"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-bold h-12 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-emerald-900/30 border-t-emerald-900 rounded-full animate-spin"></div>
                  جاري المعالجة...
                </div>
              ) : (
                "أمن سيارتك"
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
