import { useState, useEffect } from 'react';
import { Trophy, Ticket, Copy, Check } from 'lucide-react';

const FINAL_DATE = new Date('2026-07-19T15:00:00-04:00'); // MetLife Stadium, NJ (UTC-4)
const COUPON_CODE = 'COPA2026';

function getTimeRemaining(target: Date) {
  const now = new Date().getTime();
  const distance = target.getTime() - now;

  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    expired: false,
  };
}

export default function WorldCupCountdown() {
  const [time, setTime] = useState(getTimeRemaining(FINAL_DATE));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeRemaining(FINAL_DATE));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyCoupon = () => {
    navigator.clipboard.writeText(COUPON_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (time.expired) return null;

  return (
    <div className="w-full bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776] dark:from-[#002776] dark:via-[#009c3b] dark:to-[#002776] py-5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        
        {/* Countdown Timer */}
        <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/10">
          <Trophy className="w-5 h-5 text-yellow-300 flex-shrink-0" />
          <div className="flex items-center gap-1.5 text-white">
            <span className="text-xs font-semibold uppercase tracking-wider text-yellow-200">Fim da Copa em:</span>
            <div className="flex items-center gap-1.5">
              {[
                { value: time.days, label: 'D' },
                { value: time.hours, label: 'H' },
                { value: time.minutes, label: 'M' },
                { value: time.seconds, label: 'S' },
              ].map((unit, i) => (
                <div key={i} className="flex items-baseline gap-0.5">
                  <span className="text-lg sm:text-xl font-bold text-white tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-yellow-300 font-medium">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cupom / Coupon */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
          <Ticket className="w-5 h-5 text-yellow-300 flex-shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/80 font-medium">Cupom 15% OFF:</span>
            <code className="text-sm font-bold text-yellow-300 bg-black/30 px-3 py-1 rounded-lg tracking-wider font-mono">
              {COUPON_CODE}
            </code>
            <button
              onClick={copyCoupon}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Copiar cupom"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
