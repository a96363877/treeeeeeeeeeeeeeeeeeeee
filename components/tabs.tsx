"use client"

import { useState } from "react"
import { CheckCircle, UserCheck, ArrowRightLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export function Tabs() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      id: 0,
      name: "تأمين جديد",
      icon: CheckCircle,
    },
    {
      id: 1,
      name: "تحديد الهوية",
      icon: UserCheck,
    },
    {
      id: 2,
      name: "نقل الملكية",
      icon: ArrowRightLeft,
    },
  ]

  return (
    <div className="flex rounded-2xl overflow-hidden shadow-lg">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-300 relative",
            "border-r border-emerald-700/30 last:border-r-0",
            activeTab === tab.id
              ? "bg-emerald-400 text-emerald-900"
              : "bg-emerald-800/60 text-emerald-300 hover:bg-emerald-800/80 hover:text-emerald-200",
          )}
        >
          {activeTab === tab.id && (
            <div className="w-5 h-5 bg-emerald-900 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            </div>
          )}
          <span className="whitespace-nowrap">{tab.name}</span>
        </button>
      ))}
    </div>
  )
}
