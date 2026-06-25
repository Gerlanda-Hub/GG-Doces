import { useState, useEffect } from 'react';
import { Cookie, Shield, XCircle } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mundodedoces_cookies');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('mundodedoces_cookies', 'accepted');
    setVisible(false);
  };

  const denyAll = () => {
    localStorage.setItem('mundodedoces_cookies', 'denied');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white dark:bg-[#1f2c33] border-t border-gray-200 dark:border-[#2a3841] shadow-2xl animate-fade-in-up px-4 py-5 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Icon + Text */}
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Este site utiliza cookies 🍪
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
              Utilizamos cookies essenciais para o funcionamento do site e cookies opcionais de análise para melhorar a sua experiência. Pode aceitar todos, ou recusar os cookies não essenciais. Consulte a nossa{' '}
              <a href="/#/politica-privacidade" className="text-rosa-500 dark:text-rosa-400 underline hover:no-underline font-semibold">
                Política de Privacidade
              </a>{' '}
              para mais informações.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={denyAll}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />
            Negar
          </button>
          <button
            onClick={acceptAll}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-rosa-500 hover:bg-rosa-600 text-white text-sm font-semibold transition-colors shadow-md shadow-rosa-200 dark:shadow-rosa-500/10 flex items-center justify-center gap-1.5"
          >
            <Shield className="w-4 h-4" />
            Aceitar
          </button>
        </div>

      </div>
    </div>
  );
}
