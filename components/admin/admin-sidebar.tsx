/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/services/api/auth';
import { motion, AnimatePresence } from 'framer-motion';
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
  Mail,
  Phone,
  Clock,
  Heart,
  Eye,
  Zap,
} from 'lucide-react';
import { Button, Badge, Separator } from '@/components/ui';
import ThemeToggle from '../theme-toggle';

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    badge: 'New',
  },
  {
    title: 'Patients',
    href: '/admin/patients',
    icon: Users,
    badge: '1,247',
    submenu: [
      {
        title: 'All Patients',
        href: '/admin/patients',
        icon: Users,
        description: 'View and manage all patients',
      },
      {
        title: 'Add Patient',
        href: '/admin/patients/new',
        icon: UserPlus,
        description: 'Register new patient',
      },
      // {
      //   title: "Search & Filter",
      //   href: "/admin/patients?tab=search",
      //   icon: Search,
      //   description: "Advanced patient search",
      // },
      // {
      //   title: "Import/Export",
      //   href: "/admin/patients/import-export",
      //   icon: Database,
      //   description: "Bulk operations",
      // },
    ],
  },
  {
    title: 'Appointments',
    href: '/admin/appointments',
    icon: Calendar,
    badge: '23',
    submenu: [
      {
        title: '"Today\'s·Schedule"',
        href: '/admin/appointments/today',
        icon: Clock,
        description: '"View·today\'s·appointments"',
      },
      {
        title: 'All Appointments',
        href: '/admin/appointments',
        icon: Calendar,
        description: 'Manage all appointments',
      },
      {
        title: 'Availability',
        href: '/admin/appointments/availability',
        icon: Activity,
        description: 'Set doctor availability',
      },
    ],
  },
  {
    title: 'Medical Records',
    href: '/admin/records',
    icon: FileText,
    badge: null,
    submenu: [
      {
        title: 'Patient Records',
        href: '/admin/records/patients',
        icon: FileText,
        description: 'Medical history and records',
      },
      {
        title: 'Lab Results',
        href: '/admin/records/labs',
        icon: Activity,
        description: 'Laboratory test results',
      },
      {
        title: 'Prescriptions',
        href: '/admin/records/prescriptions',
        icon: Heart,
        description: 'Medication prescriptions',
      },
      {
        title: 'Imaging',
        href: '/admin/records/imaging',
        icon: Eye,
        description: 'X-rays, MRI, CT scans',
      },
    ],
  },
  {
    title: 'Communications',
    href: '/admin/communications',
    icon: Mail,
    badge: '5',
    submenu: [
      {
        title: 'Messages',
        href: '/admin/communications/messages',
        icon: Mail,
        description: 'Patient messages',
      },
      {
        title: 'Notifications',
        href: '/admin/communications/notifications',
        icon: Bell,
        description: 'System notifications',
      },
      {
        title: 'SMS & Email',
        href: '/admin/communications/campaigns',
        icon: Phone,
        description: 'Communication campaigns',
      },
    ],
  },
  {
    title: 'Reports',
    href: '/admin/reports',
    icon: TrendingUp,
    badge: null,
    submenu: [
      {
        title: 'Financial Reports',
        href: '/admin/reports/financial',
        icon: TrendingUp,
        description: 'Revenue and billing reports',
      },
      {
        title: 'Patient Analytics',
        href: '/admin/reports/patients',
        icon: Users,
        description: 'Patient demographics and trends',
      },
      {
        title: 'Performance Metrics',
        href: '/admin/reports/performance',
        icon: Zap,
        description: 'Operational performance',
      },
    ],
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    badge: null,
    submenu: [
      {
        title: 'General Settings',
        href: '/admin/settings/general',
        icon: Settings,
        description: 'System configuration',
      },
      {
        title: 'User Management',
        href: '/admin/settings/users',
        icon: User,
        description: 'Manage admin users',
      },
      {
        title: 'Security',
        href: '/admin/settings/security',
        icon: Shield,
        description: 'Security and compliance',
      },
      {
        title: 'Integrations',
        href: '/admin/settings/integrations',
        icon: Database,
        description: 'Third-party integrations',
      },
    ],
  },
];

export default function AdminSidebar({ isCollapsed, setIsCollapsed }: AdminSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push('/admin/login');
    } catch {
      // Mesmo com erro, redireciona para login
      router.push('/admin/login');
    }
  };

  const toggleExpanded = (title: string) => {
    if (isCollapsed) return; // Don't expand submenus when collapsed
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title],
    );
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const hasActiveSubmenu = (item: any) => {
    return item.submenu?.some((subItem: any) => isActive(subItem.href));
  };

  return (
    <div
      className={`flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-900 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Admin Panel</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Corpo Scienza</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 flex-shrink-0 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
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
                    onClick={() => toggleExpanded(item.title)}
                    className={`group relative flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      hasActiveSubmenu(item) || expandedItems.includes(item.title)
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <div className="flex min-w-0 items-center">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="ml-3 flex min-w-0 items-center"
                          >
                            <span className="truncate">{item.title}</span>
                            {item.badge && (
                              <Badge
                                variant={item.badge === 'New' ? 'default' : 'secondary'}
                                className="ml-2 flex-shrink-0 text-xs"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {!isCollapsed && (
                      <ChevronRight
                        className={`h-4 w-4 flex-shrink-0 transition-transform ${
                          expandedItems.includes(item.title) ? 'rotate-90' : ''
                        }`}
                      />
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-700">
                        {item.title}
                        {item.badge && <span className="ml-1 text-blue-300">({item.badge})</span>}
                      </div>
                    )}
                  </button>

                  <AnimatePresence>
                    {!isCollapsed && expandedItems.includes(item.title) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-6 mt-1 space-y-1 overflow-hidden"
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${
                              isActive(subItem.href)
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50'
                            }`}
                          >
                            <subItem.icon className="mr-2 h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{subItem.title}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`group relative flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                  title={isCollapsed ? item.title : undefined}
                >
                  <div className="flex min-w-0 items-center">
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="ml-3 flex min-w-0 items-center"
                        >
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant={item.badge === 'New' ? 'default' : 'secondary'}
                              className="ml-2 flex-shrink-0 text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-700">
                      {item.title}
                      {item.badge && <span className="ml-1 text-blue-300">({item.badge})</span>}
                    </div>
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4 dark:border-gray-700">
        <div className="space-y-3">
          {/* Theme Toggle - Now properly styled */}
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isCollapsed ? (
                <motion.div
                  key="collapsed-theme"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="group relative"
                >
                  <ThemeToggle
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  />
                  {/* Tooltip for collapsed theme toggle */}
                  <div className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-700">
                    Toggle Theme
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded-theme"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <ThemeToggle
                    variant="ghost"
                    size="sm"
                    showLabel={true}
                    className="h-8 w-full justify-start px-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-emerald-600">
              <User className="h-4 w-4 text-white" />
            </div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="min-w-0 flex-1"
                >
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Dr. Admin
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    admin@corposcienza.com
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size={isCollapsed ? 'icon' : 'sm'}
            className="group relative h-8 w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
            title={isCollapsed ? 'Logout' : undefined}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-700">
                Logout
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
