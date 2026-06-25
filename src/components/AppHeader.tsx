import { useLocation } from 'react-router-dom';
import { Sun, Moon, Share2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { shareProduct } from '../capacitor/plugins';

const titles: Record<string, string> = {
  '/': 'Mundo de Doces da GG',
  '/encomendar': 'Nova Encomenda',
  '/consultar': 'Consultar Pedido',
  '/definicoes': 'Definições',
  '/contato': 'Contactar',
};

export default function AppHeader() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const title = titles[location.pathname] || 'Mundo de Doces da GG';

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-md border-b border-gray-100 dark:border-[#1f2c33] safe-area-pt">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Logo / Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rosa-400 to-rosa-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-rosa-200">
            <span className="text-white font-extrabold text-[11px]">GG</span>
          </div>
          <h1 className="text-sm font-bold text-gray-900 dark:text-white truncate">{title}</h1>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* Partilhar */}
          <button
            onClick={() => shareProduct('Mundo de Doces da GG', 'A melhor confeitaria de Angola! 🧁 Encomende já pelo app.', window.location.origin)}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800 transition-colors"
            aria-label="Partilhar"
          >
            <Share2 className="w-4 h-4" />
          </button>
          
          {/* Tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800 transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-dourado-400" />}
          </button>
        </div>
      </div>
    </header>
  );
}
