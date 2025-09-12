'use client';

import type React from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function FormField({
  label,
  required,
  error,
  success,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {children}

        {/* Success indicator */}
        <AnimatePresence>
          {success && !error && (
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error indicator */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AlertCircle className="h-5 w-5 text-red-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="flex items-center gap-2 text-sm text-red-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
