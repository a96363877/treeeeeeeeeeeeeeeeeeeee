import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import {
  AtSign,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Phone,
  SendHorizontal,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';




export const metadata: Metadata = {
  title: " Insurance - أفضل تأمين للسيارات في السعودية",
  description:
    "احصل على أفضل عروض تأمين السيارات في المملكة العربية السعودية مع . تأمين شامل وموثوق بأسعار تنافسية.",
  keywords: "تأمين السيارات, تأمين, السعودية, , car insurance, saudi arabia",
  authors: [{ name: "Tree Insurance" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body>
        {
          <>
            <header className="flex justify-between items-center p-4 bg-[#004040] ">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-[#00E0A0] text-black hover:bg-[#00C090] border-none h-8 w-8 p-0"
                >
                  ع
                </Button>
              </div>
              <div className="text-[#00E0A0] text-3xl font-bold ml-auto">
                tree
              </div>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu />
              </Button>
            </header>

            <div dir="rtl" className='bg-white '>{children}</div>
            {/* Footer */}
            <footer className="p-4 space-y-6" dir="rtl">
              <div className="text-center">
                <h2 className="font-bold mb-2 text-right">:تواصل معنا</h2>
                <div className="flex justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/10 h-8 w-8 p-0"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/10 h-8 w-8 p-0"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/10 h-8 w-8 p-0"
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/10 h-8 w-8 p-0"
                  >
                    <AtSign className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/10 h-8 w-8 p-0"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/10 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/10 h-8 w-8 p-0"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 rtl">
                <p className="text-sm py-1">تأمين السيارات</p>
                <p className="text-sm py-1">تأمين السفر</p>
                <p className="text-sm py-1">تأمين الحيوانات الأليفة</p>
                <p className="text-sm py-1">مركز تحميل الوثائق</p>
                <p className="text-sm py-1">ارفع مطالبة</p>
                <p className="text-sm py-1">ابدأ محادثة أونلاين</p>
                <p className="text-sm py-1">تسجيل الدخول</p>
              </div>

              <div className="flex justify-between items-center pt-4">
                <div className="flex gap-2">
                  <div className="bg-white p-1 rounded h-10 w-10 flex items-center justify-center">
                    <Image src="/thre.svg" alt="VAT" width={50} height={30} />
                  </div>
                  <div className="bg-white p-1 rounded h-10 w-10 flex items-center justify-center">
                    <Image src="/vercel.svg" alt="IA" width={50} height={30} />
                  </div>
                </div>
                <Image src="/next.svg" alt="IA" width={50} height={30} />{' '}
              </div>
            </footer>
          </>
        }
      </body>
    </html>
  );
}
