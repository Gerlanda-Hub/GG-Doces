import { Trophy, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WorldCupBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#002776] via-[#009c3b] to-[#ffdf00] dark:from-[#1a0a0a] dark:via-[#0d1f0d] dark:to-[#1a1a00]">
      {/* Padrão de fundo — losangos da bandeira brasileira */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style={{
        backgroundImage: `
          linear-gradient(45deg, #ffdf00 25%, transparent 25%),
          linear-gradient(-45deg, #ffdf00 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #ffdf00 75%),
          linear-gradient(-45deg, transparent 75%, #ffdf00 75%)
        `,
        backgroundSize: '60px 60px',
        backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
      }} />

      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-green-400/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Text + CTA */}
          <div className="text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 text-xs font-semibold uppercase tracking-wider animate-pulse">
              <Trophy className="w-3.5 h-3.5" />
              Oferta Especial FIFA World Cup 2026
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              ⚽ Celebre o Mundial com a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-green-200 to-yellow-300">
                Mundo de Doces
              </span>
            </h2>
            
            <p className="text-green-100 text-lg max-w-xl">
              Encomende para a sua festa de futebol e receba <strong className="text-yellow-300">15% de desconto</strong> em todos os salgados e doces!
            </p>

            {/* Destaques com as bandeiras */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {[
                { icon: '🇧🇷', text: 'Tema Brasil' },
                { icon: '🇦🇴', text: 'Tema Angola' },
                { icon: '⚽', text: 'Bolo da Copa' },
                { icon: '🏆', text: 'Doces temáticos' },
                { icon: '🥅', text: 'Salgados pro jogo' },
                { icon: '🎉', text: 'Kit festa completa' },
              ].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 text-xs text-white font-medium">
                  {item.icon} {item.text}
                </span>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                to="/encomendar?tema=copa"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold text-sm transition-all shadow-lg shadow-yellow-400/30"
              >
                ⚽ Encomendar Agora
              </Link>
              <a
                href="https://wa.me/244927718735?text=Olá! Quero saber mais sobre a promoção da FIFA World Cup 2026! ⚽"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/30 text-white hover:bg-white/10 text-sm font-semibold transition-all"
              >
                🎉 Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* Deco — Trophy + flags */}
          <div className="flex-shrink-0 relative">
            {/* Anel decorativo */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-yellow-400/20 via-green-400/20 to-blue-400/20 border-2 border-yellow-400/30 flex items-center justify-center animate-float">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-yellow-400/10 via-green-500/10 to-blue-500/10 border border-yellow-400/20 flex items-center justify-center">
                <div className="relative">
                  <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400 drop-shadow-lg" />
                  {/* Mini bandeiras */}
                  <span className="absolute -top-2 -left-4 text-2xl">🇧🇷</span>
                  <span className="absolute -top-2 -right-4 text-2xl">🇦🇴</span>
                </div>
              </div>
            </div>
            {/* Estrelas */}
            <Star className="absolute top-0 right-0 w-6 h-6 text-yellow-400 animate-pulse fill-yellow-400" />
            <Star className="absolute bottom-2 left-0 w-4 h-4 text-green-300 animate-pulse fill-green-300" />
            <Star className="absolute -top-4 left-8 w-5 h-5 text-yellow-300 animate-pulse fill-yellow-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
