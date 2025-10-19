"use client"

import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { usePathname } from "next/navigation"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className="min-h-screen">{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  )
}
