import { Link, useNavigate } from 'react-router-dom';
import { Heart, Shield, Lightbulb, Star, Sparkles, Smartphone, Download } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import AdSenseAd from '../components/AdSenseAd';
import WorldCupBanner from '../components/WorldCupBanner';
import WorldCupCountdown from '../components/WorldCupCountdown';
import { isNative } from '../capacitor/plugins';
import { useTranslation } from '../i18n/LanguageContext';
import type { Service } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const servicos: Service[] = [
    { id: '1', icon: '🎂', title: t('bolo_aniversario'), description: t('bolo_aniversario_desc'), slug: 'bolo-aniversario' },
    { id: '2', icon: '💍', title: t('bolo_noivado'), description: t('bolo_noivado_desc'), slug: 'bolo-noivado' },
    { id: '3', icon: '🧁', title: t('cupcakes'), description: t('cupcakes_desc'), slug: 'cupcakes' },
    { id: '4', icon: '🍬', title: t('doces'), description: t('doces_desc'), slug: 'doces' },
    { id: '5', icon: '🥟', title: t('salgados'), description: t('salgados_desc'), slug: 'salgados' },
  ];

const valores = [
  { icon: Shield, label: 'Qualidade', desc: 'Materiais premium e processos rigorosos' },
  { icon: Heart, label: 'Compromisso', desc: 'Dedicação total a cada encomenda' },
  { icon: Lightbulb, label: 'Criatividade', desc: 'Designs únicos e personalizados' },
  { icon: Star, label: 'Profissionalismo', desc: 'Excelência em cada detalhe' },
];

  const scrollToServicos = () => {
    document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* ⚽ FIFA World Cup 2026 Countdown + Cupom */}
      <WorldCupCountdown />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rosa-50 via-white to-dourado-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-rosa-200/20 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-dourado-200/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rosa-50 border border-rosa-200 text-rosa-600 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" /> {t('confeitaria_artesanal')}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                Mundo de Doces{' '}
                <span className="text-gradient-rosa">da GG</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                {t('hero_subtitle')}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/encomendar"
                  className="px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-rosa-400 to-rosa-500 text-white hover:from-rosa-500 hover:to-rosa-600 shadow-lg shadow-rosa-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  {t('fazer_encomenda')}
                </Link>
                <Link
                  to="/contato"
                  className="px-6 py-3 rounded-full text-sm font-semibold border-2 border-dourado-300 text-dourado-700 hover:bg-dourado-50 transition-all duration-300"
                >
                  {t('solicitar_orcamento')}
                </Link>
                <a
                  href="https://wa.me/244927718735"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-sm font-semibold border-2 border-rosa-200 text-rosa-600 hover:bg-rosa-50 transition-all duration-300"
                >
                  {t('falar_gestao')}
                </a>
              </div>
            </div>

            {/* Hero image */}
            <div className="animate-fade-in relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-gradient-to-br from-rosa-100 to-dourado-100 flex items-center justify-center">
                <div className="text-[120px] animate-float">
                  🎂
                </div>
                <div className="absolute bottom-4 right-4 text-6xl opacity-60">
                  🧁
                </div>
                <div className="absolute top-4 left-4 text-5xl opacity-50">
                  🍬
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToServicos}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-rosa-400"
          aria-label="Ver mais"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </section>

      {/* ⚽ FIFA World Cup 2026 Promo Banner */}
      <WorldCupBanner />

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-rosa-500 font-semibold text-sm uppercase tracking-wider">{t('nossos_servicos')}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">{t('nossos_servicos')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t('servicos_subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => navigate('/encomendar')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ⚽ Produtos Temáticos da Copa */}
      <section className="py-20 bg-gradient-to-br from-green-50/30 via-white to-yellow-50/30 dark:from-green-950/20 dark:via-gray-950 dark:to-yellow-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-xs font-semibold uppercase tracking-wider mb-4">
              ⚽ Edição Especial Copa do Mundo
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Produtos Temáticos Exclusivos</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Surpreenda os seus convidados com criações especiais para os jogos da seleção!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '⚽',
                title: 'Bolo da Copa',
                desc: 'Bolo decorado com o tema do futebol — relva, bola e o troféu da FIFA. Personalizável com as cores da sua seleção favorita.',
                tag: 'Mais vendido',
                color: 'bg-amber-100 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
                tagColor: 'bg-amber-500 text-white',
              },
              {
                icon: '🏆',
                title: 'Cupcakes Campeões',
                desc: 'Cupcakes decorados com mini bandeiras, bolas de futebol e o número dos seus jogadores preferidos.',
                tag: 'Novidade',
                color: 'bg-green-100 dark:bg-green-500/10 border-green-200 dark:border-green-500/20',
                tagColor: 'bg-green-500 text-white',
              },
              {
                icon: '🥅',
                title: 'Kit Golo',
                desc: 'Combinado de salgados para o intervalo — 50 rissóis + 50 croquetes + 50 bolinhas de queijo.',
                tag: '15% OFF',
                color: 'bg-yellow-100 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20',
                tagColor: 'bg-red-500 text-white',
              },
            ].map((product, i) => (
              <div
                key={i}
                className={`${product.color} rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 group cursor-pointer`}
                onClick={() => navigate('/encomendar?tema=copa')}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl group-hover:scale-110 transition-transform inline-block">{product.icon}</span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${product.tagColor}`}>
                    {product.tag}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{product.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 dark:text-green-400 group-hover:underline">
                  Encomendar agora →
                </span>
              </div>
            ))}
          </div>

          {/* CTA rápido */}
          <div className="text-center mt-10">
            <Link
              to="/encomendar?tema=copa"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-sm hover:from-green-700 hover:to-green-800 shadow-xl shadow-green-500/20 transition-all"
            >
              ⚽ Ver Todos os Produtos da Copa
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-rosa-50/50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-rosa-500 font-semibold text-sm uppercase tracking-wider">Sobre Nós</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Quem somos
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                A <strong>Mundo de Doces da GG</strong> é uma empresa angolana dedicada a criar momentos
                especiais através da confeitaria artesanal. Cada produto é preparado com
                ingredientes selecionados e atenção personalizada.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Acreditamos que cada celebração merece um toque especial. Do bolo de aniversário aos
                doces e salgados, trabalhamos com criatividade e profissionalismo para
                superar as expectativas dos nossos clientes.
              </p>
              <p className="text-gray-600 leading-relaxed">
                O nosso compromisso é com a excelência — desde o primeiro contacto até à entrega final.
                Estamos em constante crescimento, sempre focados na satisfação de quem confia em nós.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {valores.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <Icon className="w-8 h-8 text-rosa-400 mb-3" />
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{label}</h3>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-rosa-50 to-rosa-100/50 rounded-2xl p-8 border border-rosa-100">
              <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 Missão</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Oferecer produtos de confeitaria de qualidade que contribuam para momentos
                especiais dos nossos clientes.
              </p>
            </div>
            <div className="bg-gradient-to-br from-dourado-50 to-dourado-100/50 rounded-2xl p-8 border border-dourado-100">
              <h3 className="text-xl font-bold text-gray-800 mb-3">🔭 Visão</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ser reconhecida pela qualidade, criatividade e excelência no atendimento em Angola.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">💎 Valores</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Qualidade, Compromisso, Criatividade, Profissionalismo, Confiança e Satisfação do Cliente.
              </p>
            </div>
          </div>
        </div>
      </section>





      {/* 📱 Mobile App Promo Section — Premium Design */}
      {!isNative() && (
      <section className="py-24 bg-gradient-to-br from-gray-950 via-[#1a0f18] to-[#0d0d1a] border-t border-b border-gray-800 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-rosa-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-dourado-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rosa-400/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rosa-500/10 border border-rosa-500/20 text-rosa-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Smartphone className="w-3.5 h-3.5" /> Aplicativo Oficial
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Leve a <span className="text-gradient-rosa">Mundo de Doces da GG</span> no seu bolso!
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Descarregue a nossa app oficial para Android e tenha acesso a encomendas rápidas, rastreio em tempo real e notificações instantâneas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Phone Mockup — realistic Android app */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="relative">
                {/* Glow behind phone */}
                <div className="absolute inset-0 bg-gradient-to-br from-rosa-500 via-dourado-500 to-rosa-400 blur-2xl opacity-30 rounded-[60px] scale-90" />
                
                {/* Phone frame */}
                <div className="relative w-[280px] h-[580px] bg-[#0f0f0f] rounded-[44px] border-[6px] border-gray-800 shadow-2xl overflow-hidden">
                  {/* Notch / status bar */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#0f0f0f] rounded-b-2xl z-30 flex items-center justify-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                    <div className="w-14 h-1.5 bg-gray-800 rounded-full" />
                  </div>

                  {/* Status bar */}
                  <div className="pt-8 pb-2 px-5 flex items-center justify-between bg-[#0f0f0f]">
                    <span className="text-[9px] font-semibold text-white">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-[9px] text-gray-400">4G</span>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-rosa-500 to-rosa-600 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                      <span className="text-[11px] text-white font-extrabold">GG</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">Mundo de Doces</span>
                      <p className="text-[8px] text-rosa-100">Assistente Virtual</p>
                    </div>
                  </div>

                  {/* App content */}
                  <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-[#0b141a]">
                    {/* Welcome card */}
                    <div className="bg-[#1f2c33] p-3.5 rounded-2xl border border-[#2a3841]">
                      <div className="text-2xl mb-1.5">🧁</div>
                      <h5 className="font-bold text-[11px] text-[#e9edef]">Encomendar Agora</h5>
                      <p className="text-[9px] text-[#8696a0] mt-0.5">Escolha os seus doces favoritos em segundos</p>
                    </div>

                    {/* Services grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#1f2c33] p-2.5 rounded-xl border border-[#2a3841]">
                        <div className="text-lg">🎂</div>
                        <p className="text-[9px] font-semibold text-[#e9edef] mt-1">Bolos</p>
                      </div>
                      <div className="bg-[#1f2c33] p-2.5 rounded-xl border border-[#2a3841]">
                        <div className="text-lg">🥟</div>
                        <p className="text-[9px] font-semibold text-[#e9edef] mt-1">Salgados</p>
                      </div>
                      <div className="bg-[#1f2c33] p-2.5 rounded-xl border border-[#2a3841]">
                        <div className="text-lg">🍬</div>
                        <p className="text-[9px] font-semibold text-[#e9edef] mt-1">Doces</p>
                      </div>
                      <div className="bg-[#1f2c33] p-2.5 rounded-xl border border-[#2a3841]">
                        <div className="text-lg">🧁</div>
                        <p className="text-[9px] font-semibold text-[#e9edef] mt-1">Cupcakes</p>
                      </div>
                    </div>

                    {/* Track order preview */}
                    <div className="bg-[#1f2c33] p-3.5 rounded-2xl border border-[#2a3841]">
                      <p className="text-[9px] font-semibold text-[#8696a0] mb-2">Acompanhar Encomenda</p>
                      <div className="h-2 bg-[#2a3841] rounded-full overflow-hidden">
                        <div className="h-full w-[65%] bg-gradient-to-r from-rosa-400 to-rosa-500 rounded-full" />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-[8px] font-bold text-rosa-400">🟠 Em Preparação</p>
                        <p className="text-[7px] text-[#667781]">MDG-X8K2PL9Q</p>
                      </div>
                    </div>

                    {/* Quick action */}
                    <div className="bg-rosa-500 p-3 rounded-2xl text-center">
                      <p className="text-[10px] font-bold text-white">📸 Tirar Foto de Referência</p>
                      <p className="text-[8px] text-rosa-100 mt-0.5">Use a câmara para enviar o seu modelo</p>
                    </div>
                  </div>

                  {/* Bottom nav bar (Android style) */}
                  <div className="flex items-center justify-around py-2.5 px-4 bg-[#0f0f0f] border-t border-[#1f2c33]">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-4 h-4 rounded bg-rosa-500" />
                      <span className="text-[7px] text-rosa-400">Início</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-4 h-4 rounded bg-gray-600" />
                      <span className="text-[7px] text-gray-500">Encomendar</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-4 h-4 rounded bg-gray-600" />
                      <span className="text-[7px] text-gray-500">Consultar</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-4 h-4 rounded bg-gray-600" />
                      <span className="text-[7px] text-gray-500">Definições</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits + Download */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-5">
                {[
                  { icon: '⚡', title: 'Velocidade Máxima', desc: 'Carregamento instantâneo com navegação fluida otimizada para Angola.' },
                  { icon: '🔔', title: 'Notificações em Tempo Real', desc: 'Receba alertas push sempre que o estado da sua encomenda for atualizado.' },
                  { icon: '📷', title: 'Câmara Integrada', desc: 'Tire fotos de referência diretamente pela app e envie com a sua encomenda.' },
                  { icon: '📍', title: 'GPS Inteligente', desc: 'Preenchimento automático da sua localização para entrega no local certo.' },
                  { icon: '🌙', title: 'Modo Escuro Nativo', desc: 'Interface adaptada para conforto visual a qualquer hora do dia.' },
                  { icon: '📤', title: 'Partilha Rápida', desc: 'Partilhe produtos e promoções com amigos pelo WhatsApp ou redes sociais.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">{item.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Download CTA */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rosa-400 to-rosa-600 flex items-center justify-center shadow-lg shadow-rosa-500/20">
                    <span className="text-white font-extrabold text-sm">GG</span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Mundo de Doces da GG</p>
                    <p className="text-xs text-gray-400">Versão 2.0 • 12 MB • Grátis</p>
                  </div>
                </div>
                
                <a
                  href="/app-release.apk"
                  download="Mundo_de_Doces_da_GG.apk"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-rosa-500 to-rosa-600 text-white font-bold text-sm hover:from-rosa-600 hover:to-rosa-700 shadow-xl shadow-rosa-500/30 transition-all hover:scale-[1.02] active:scale-98"
                >
                  <Download className="w-5 h-5" />
                  Descarregar App Android (.APK)
                </a>
                
                <p className="text-center text-[11px] text-gray-500">
                  Compatível com Android 7.0+ • Instalação rápida e segura • Sem anúncios
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 💰 Google AdSense Banner (só no site) */}
      {!isNative() && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSenseAd slot="home-bottom-ad" />
      </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rosa-500 to-rosa-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('pronta_celebração')}
          </h2>
          <p className="text-rosa-100 mb-8 text-lg">
            {t('cta_subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/encomendar"
              className="px-8 py-4 rounded-full text-sm font-semibold bg-white text-rosa-600 hover:bg-gray-50 shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Fazer Encomenda
            </Link>
            <Link
              to="/contato"
              className="px-8 py-4 rounded-full text-sm font-semibold border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
