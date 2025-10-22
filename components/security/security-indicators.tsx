import { Shield, Lock } from 'lucide-react';

export default function SecurityIndicators() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <div className="security-badge">
        <Shield className="h-3 w-3" />
        <span>HIPAA Compliant</span>
      </div>
      <div className="security-badge">
        <Lock className="h-3 w-3" />
        <span>SSL Secured</span>
      </div>
    </div>
  );
}
