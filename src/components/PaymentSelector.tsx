import { CreditCard, Building2, Smartphone, Banknote, Receipt, Check } from 'lucide-react';

interface PaymentOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  details: string;
  color: string;
  bgColor: string;
}

export const paymentMethods: PaymentOption[] = [
  {
    id: 'multicaixa-express',
    icon: <Smartphone className="w-5 h-5" />,
    title: 'Multicaixa Express',
    subtitle: 'Transferência instantânea',
    details: 'Envie o valor para o número: +244 927 718 735. Envie o comprovativo por WhatsApp.',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20',
  },
  {
    id: 'transferencia',
    icon: <Building2 className="w-5 h-5" />,
    title: 'Transferência Bancária',
    subtitle: 'BAI / BFA / Atlântico / Sol',
    details: 'Solicite o IBAN à gestão via WhatsApp. A encomenda é confirmada após validação do comprovativo.',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
  },
  {
    id: 'referencia',
    icon: <Receipt className="w-5 h-5" />,
    title: 'Referência de Pagamento',
    subtitle: 'Pague em qualquer multicaixa',
    details: 'Será gerada uma referência de pagamento e enviada para o seu WhatsApp ou e-mail.',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
  },
  {
    id: 'dinheiro',
    icon: <Banknote className="w-5 h-5" />,
    title: 'Dinheiro / Contra-entrega',
    subtitle: 'Pague quando receber',
    details: 'Pagamento em dinheiro no momento da entrega. Disponível em Luanda e arredores.',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20',
  },
];

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function PaymentSelector({ selected, onSelect }: Props) {
  return (
    <div className="bg-white dark:bg-[#1f2c33] border border-gray-200 dark:border-[#2a3841] rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-rosa-500" />
        <h3 className="font-semibold text-gray-800 dark:text-white text-lg">Método de Pagamento</h3>
        <span className="text-xs text-gray-400 ml-auto">(opcional)</span>
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Escolha como prefere pagar. A gestão confirmará os detalhes do pagamento após a encomenda.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentMethods.map((method) => {
          const isSelected = selected === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`relative cursor-pointer rounded-2xl p-4 border-2 transition-all duration-300 flex flex-col gap-2 ${
                isSelected
                  ? `${method.bgColor} shadow-md`
                  : 'border-gray-150 dark:border-[#2a3841] hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm'
              }`}
            >
              {/* Checkmark */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-rosa-500 text-white flex items-center justify-center shadow animate-fade-in">
                  <Check className="w-3 h-3" />
                </div>
              )}

              <div className={`flex items-center gap-2.5 ${method.color}`}>
                <div className={`w-9 h-9 rounded-xl ${method.bgColor} flex items-center justify-center`}>
                  {method.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-gray-800 dark:text-white">{method.title}</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{method.subtitle}</p>
                </div>
              </div>

              {isSelected && (
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed animate-fade-in pl-11">
                  {method.details}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
