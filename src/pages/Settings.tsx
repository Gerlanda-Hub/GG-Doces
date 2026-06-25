import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../i18n/LanguageContext';
import { ArrowLeft, Sun, Moon, Phone, Mail, MapPin, User, Globe, Info, ChevronRight, Check } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b141a]">
      <div className="bg-white dark:bg-[#1f2c33] border-b border-gray-100 dark:border-[#2a3841] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">{t('definicoes')}</h1>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        
        {/* Contactos */}
        <div className="bg-white dark:bg-[#1f2c33] rounded-2xl border border-gray-100 dark:border-[#2a3841] overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800">
            <h2 className="text-xs font-semibold text-rosa-500 uppercase tracking-wider">{t('contactos')}</h2>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{t('telefone_whatsapp')}</p>
                <p className="font-medium text-gray-900 dark:text-white">+244 927 718 735</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-full bg-rosa-50 dark:bg-rosa-500/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-rosa-500 dark:text-rosa-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{t('email')}</p>
                <p className="font-medium text-gray-900 dark:text-white">ggsuportes@gmai.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{t('localizacao')}</p>
                <p className="font-medium text-gray-900 dark:text-white">Luanda, Angola</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferências */}
        <div className="bg-white dark:bg-[#1f2c33] rounded-2xl border border-gray-100 dark:border-[#2a3841] overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800">
            <h2 className="text-xs font-semibold text-rosa-500 uppercase tracking-wider">{t('preferencias')}</h2>
          </div>
          
          <button
            onClick={toggleTheme}
            className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-dourado-50 dark:bg-dourado-500/10' : 'bg-gray-100 dark:bg-gray-700'}`}>
                {theme === 'dark' ? <Sun className="w-4 h-4 text-dourado-500" /> : <Moon className="w-4 h-4 text-gray-600" />}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{t('tema_escuro')}</span>
            </div>
            <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${theme === 'dark' ? 'bg-rosa-500' : 'bg-gray-300'}`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'translate-x-4' : ''}`} />
            </div>
          </button>

          <button
            onClick={() => navigate('/cliente')}
            className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-t border-gray-50 dark:border-gray-800"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rosa-50 dark:bg-rosa-500/10 flex items-center justify-center">
                <User className="w-4 h-4 text-rosa-500 dark:text-rosa-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{t('conta_login')}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          {/* Language selector - real toggle */}
          <div className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-t border-gray-50 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{t('idioma')}</span>
            </div>
            <div className="flex gap-1.5">
              {[
                { code: 'pt' as const, flag: '🇵🇹', label: 'PT' },
                { code: 'en' as const, flag: '🇬🇧', label: 'EN' },
                { code: 'es' as const, flag: '🇪🇸', label: 'ES' },
                { code: 'fr' as const, flag: '🇫🇷', label: 'FR' },
              ].map(({ code, flag, label }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1 ${
                    lang === code
                      ? 'bg-rosa-500 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {flag} {label}
                  {lang === code && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Informações */}
        <div className="bg-white dark:bg-[#1f2c33] rounded-2xl border border-gray-100 dark:border-[#2a3841] overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800">
            <h2 className="text-xs font-semibold text-rosa-500 uppercase tracking-wider">{t('informacoes')}</h2>
          </div>
          
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Info className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{t('versao')}</span>
            </div>
            <span className="text-xs text-gray-400">2.0.0</span>
          </div>

          <div className="px-4 py-4 flex items-center justify-between border-t border-gray-50 dark:border-gray-800">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Mundo de Doces da GG</span>
            <span className="text-xs text-gray-400">© 2026</span>
          </div>
        </div>

      </div>
    </div>
  );
}
