import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Search, Settings as SettingsIcon } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

const tabs = [
  { path: '/', icon: Home, labelKey: 'inicio' },
  { path: '/encomendar', icon: ShoppingBag, labelKey: 'encomendar' },
  { path: '/consultar', icon: Search, labelKey: 'consultar' },
  { path: '/definicoes', icon: SettingsIcon, labelKey: 'definicoes' },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-[#1f2c33] safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-all rounded-xl mx-0.5 ${
                isActive
                  ? 'text-rosa-500 scale-105'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              <div className={`relative ${isActive ? '' : ''}`}>
                <tab.icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rosa-500" />
                )}
              </div>
              <span className={`text-[10px] font-medium leading-none ${isActive ? 'font-semibold' : ''}`}>
                {t(tab.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
