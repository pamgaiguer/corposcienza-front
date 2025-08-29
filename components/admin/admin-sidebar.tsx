"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  BarChart3,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Bell,
  Shield,
  Database,
  Activity,
  TrendingUp,
  UserPlus,
  Search,
  Mail,
  Phone,
  Clock,
  Heart,
  Eye,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ThemeToggle from "../theme-toggle"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    badge: "New",
  },
  {
    title: "Patients",
    href: "/admin/patients",
    icon: Users,
    badge: "1,247",
    submenu: [
      {
        title: "All Patients",
        href: "/admin/patients",
        icon: Users,
        description: "View and manage all patients",
      },
      {
        title: "Add Patient",
        href: "/admin/patients/new",
        icon: UserPlus,
        description: "Register new patient",
      },
      {
        title: "Search & Filter",
        href: "/admin/patients?tab=search",
        icon: Search,
        description: "Advanced patient search",
      },
      {
        title: "Import/Export",
        href: "/admin/patients/import-export",
        icon: Database,
        description: "Bulk operations",
      },
    ],
  },
  {
    title: "Appointments",
    href: "/admin/appointments",
    icon: Calendar,
    badge: "23",
    submenu: [
      {
        title: "Today's Schedule",
        href: "/admin/appointments/today",
        icon: Clock,
        description: "View today's appointments",
      },
      {
        title: "All Appointments",
        href: "/admin/appointments",
        icon: Calendar,
        description: "Manage all appointments",
      },
      {
        title: "Availability",
        href: "/admin/appointments/availability",
        icon: Activity,
        description: "Set doctor availability",
      },
    ],
  },
  {
    title: "Medical Records",
    href: "/admin/records",
    icon: FileText,
    badge: null,
    submenu: [
      {
        title: "Patient Records",
        href: "/admin/records/patients",
        icon: FileText,
        description: "Medical history and records",
      },
      {
        title: "Lab Results",
        href: "/admin/records/labs",
        icon: Activity,
        description: "Laboratory test results",
      },
      {
        title: "Prescriptions",
        href: "/admin/records/prescriptions",
        icon: Heart,
        description: "Medication prescriptions",
      },
      {
        title: "Imaging",
        href: "/admin/records/imaging",
        icon: Eye,
        description: "X-rays, MRI, CT scans",
      },
    ],
  },
  {
    title: "Communications",
    href: "/admin/communications",
    icon: Mail,
    badge: "5",
    submenu: [
      {
        title: "Messages",
        href: "/admin/communications/messages",
        icon: Mail,
        description: "Patient messages",
      },
      {
        title: "Notifications",
        href: "/admin/communications/notifications",
        icon: Bell,
        description: "System notifications",
      },
      {
        title: "SMS & Email",
        href: "/admin/communications/campaigns",
        icon: Phone,
        description: "Communication campaigns",
      },
    ],
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: TrendingUp,
    badge: null,
    submenu: [
      {
        title: "Financial Reports",
        href: "/admin/reports/financial",
        icon: TrendingUp,
        description: "Revenue and billing reports",
      },
      {
        title: "Patient Analytics",
        href: "/admin/reports/patients",
        icon: Users,
        description: "Patient demographics and trends",
      },
      {
        title: "Performance Metrics",
        href: "/admin/reports/performance",
        icon: Zap,
        description: "Operational performance",
      },
    ],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    badge: null,
    submenu: [
      {
        title: "General Settings",
        href: "/admin/settings/general",
        icon: Settings,
        description: "System configuration",
      },
      {
        title: "User Management",
        href: "/admin/settings/users",
        icon: User,
        description: "Manage admin users",
      },
      {
        title: "Security",
        href: "/admin/settings/security",
        icon: Shield,
        description: "Security and compliance",
      },
      {
        title: "Integrations",
        href: "/admin/settings/integrations",
        icon: Database,
        description: "Third-party integrations",
      },
    ],
  },
]

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  const hasActiveSubmenu = (item: any) => {
    return item.submenu?.some((subItem: any) => isActive(subItem.href))
  }

  return (
    <motion.aside
      className={`fixed left-0 top-0 z-40 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      initial={false}
      animate={{ width: isCollapsed ? 64 : 256 }}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <Link href="/admin" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Admin Panel</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Corpo Scienza</span>
              </div>
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => !isCollapsed && toggleExpanded(item.title)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        hasActiveSubmenu(item) || expandedItems.includes(item.title)
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-4 w-4 mr-3" />
                        {!isCollapsed && (
                          <>
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </div>
                      {!isCollapsed && (
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            expandedItems.includes(item.title) ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {!isCollapsed && expandedItems.includes(item.title) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 mt-1 space-y-1"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                                isActive(subItem.href)
                                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                              }`}
                            >
                              <subItem.icon className="h-3 w-3 mr-2" />
                              <span>{subItem.title}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-4 w-4 mr-3" />
                      {!isCollapsed && (
                        <>
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant={item.badge === "New" ? "default" : "secondary"} className="ml-2 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="space-y-3">
            {/* Theme Toggle */}
            <div className="flex items-center justify-center">
              <ThemeToggle
                variant="outline"
                size={isCollapsed ? "icon" : "default"}
                showLabel={!isCollapsed}
                className="w-full"
              />
            </div>

            <Separator />

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Dr. Admin</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@corposcienza.com</p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size={isCollapsed ? "icon" : "sm"}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
