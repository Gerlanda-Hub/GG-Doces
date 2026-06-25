import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { setupNetworkListener } from '../capacitor/plugins';

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(!navigator.onLine);
    return setupNetworkListener((online) => setOffline(!online));
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] bg-amber-500 text-white text-center py-2 px-4 text-xs font-semibold animate-fade-in flex items-center justify-center gap-1.5">
      <WifiOff className="w-3.5 h-3.5" />
      Modo offline — algumas funcionalidades podem estar limitadas
    </div>
  );
}
