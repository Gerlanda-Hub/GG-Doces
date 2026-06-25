import type { Service } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface Props {
  service: Service;
  onClick: () => void;
}

export default function ServiceCard({ service, onClick }: Props) {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-rosa-200 dark:hover:border-rosa-500/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
        {service.icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-rosa-600 transition-colors">
        {service.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {service.description}
      </p>
      <span className="inline-block mt-4 text-sm font-medium text-rosa-500 group-hover:text-rosa-600 transition-colors">
        {t('encomendar_cta')}
      </span>
    </div>
  );
}
