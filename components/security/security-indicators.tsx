"use client"

import { Shield, Lock, Award, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SecurityIndicators() {
  const securityFeatures = [
    {
      icon: Shield,
      label: "HIPAA Compliant",
      description: "Proteção total de dados médicos",
    },
    {
      icon: Lock,
      label: "Criptografia SSL",
      description: "Comunicação segura e protegida",
    },
    {
      icon: Award,
      label: "ISO 27001",
      description: "Certificação internacional de segurança",
    },
    {
      icon: CheckCircle,
      label: "LGPD Compliant",
      description: "Conformidade com lei brasileira",
    },
  ]

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {securityFeatures.map((feature, index) => (
        <Badge key={index} variant="outline" className="security-badge flex items-center gap-2 px-3 py-2">
          <feature.icon className="h-4 w-4" />
          <span className="font-medium">{feature.label}</span>
        </Badge>
      ))}
    </div>
  )
}
