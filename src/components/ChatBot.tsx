import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../i18n/LanguageContext';

const OPENAI_KEY = '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';

const QUICK_REPLIES = [
  'Fazer uma encomenda',
  'Solicitar orçamento',
  'Ver serviços',
  'Falar com a gestão',
];

interface LocalMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: number;
}

async function getSmartResponse(userMessage: string, history: string[]): Promise<string> {
  try {
    const systemPrompt = `Tu és a assistente virtual oficial da Mundo de Doces da GG, uma confeitaria artesanal premium em Luanda, Angola.
Serviços: Bolos de Aniversário, Bolos de Noivado, Cupcakes, Doces Finos, Salgados.
Contacto: +244 927 718 735 | ggsuportes@gmai.com.
Horário: Seg-Sáb, 08:00-20:00.
Regras: Responde em Português de Angola, curto (1-4 frases), caloroso, sem links HTML, sem markdown, sem mencionar IA/OpenAI. Usa emojis com moderação.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-6).map((msg, i) => ({
        role: i % 2 === 0 ? 'user' as const : 'assistant' as const,
        content: msg,
      })),
      { role: 'user' as const, content: userMessage },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify({ model: 'gpt-3.5-turbo', messages, max_tokens: 250, temperature: 0.7 }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } catch {
    return '';
  }
}

export default function ChatBot() {
  const { state, sendChatMessage } = useApp();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persistent session ID
  const [sessionId] = useState<string>(() => {
    const saved = localStorage.getItem('mundodedoces_chat_session');
    if (saved) return saved;
    const newId = crypto.randomUUID();
    localStorage.setItem('mundodedoces_chat_session', newId);
    return newId;
  });

  // Filter messages from Supabase state for this session
  const supabaseMessages = state.chatMessages
    .filter(m => m.sessionId === sessionId)
    .map(m => ({
      id: m.id,
      text: m.text,
      sender: m.sender as 'bot' | 'user',
      timestamp: typeof m.timestamp === 'number' ? m.timestamp : new Date(m.timestamp).getTime(),
    }));

  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([]);

  // Sync: if Supabase has messages, use them; otherwise use local with welcome
  const displayMessages = supabaseMessages.length > 0 ? supabaseMessages : (localMessages.length > 0 ? localMessages : [{
    id: 'welcome',
    text: 'Olá! 👋 Bem-vinda à Mundo de Doces da GG! Como posso ajudar? Pode perguntar sobre os nossos bolos, cupcakes, doces, salgados ou fazer uma encomenda.',
    sender: 'bot' as const,
    timestamp: Date.now(),
  }]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const now = Date.now();

    // 1. Save user message to Supabase via context
    await sendChatMessage({
      sessionId,
      sender: 'user',
      text: text.trim(),
      clientName: 'Cliente Anónimo',
    });

    // 2. Optimistic local update
    setLocalMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      text: text.trim(),
      sender: 'user',
      timestamp: now,
    }]);
    setInput('');
    setIsTyping(true);

    // 3. Get AI response
    const history = displayMessages.map(m => m.text);
    const aiReply = await getSmartResponse(text.trim(), history);
    const finalReply = aiReply || 'Obrigada pelo seu contacto! 😊 Para falar diretamente com a nossa gestão, contacte-nos pelo WhatsApp (+244 927 718 735) ou preencha o formulário de encomenda no site.';

    // 4. Save bot reply to Supabase
    await sendChatMessage({
      sessionId,
      sender: 'bot',
      text: finalReply,
      clientName: 'Mundo de Doces da GG',
    });

    setLocalMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      text: finalReply,
      sender: 'bot',
      timestamp: Date.now(),
    }]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-rosa-400 to-rosa-600 text-white shadow-lg shadow-rosa-300/40 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center group"
          aria-label="Abrir chat"
        >
          <MessageCircle className="w-7 h-7 group-hover:animate-bounce" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[540px] max-h-[calc(100vh-8rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden animate-fade-in-up">
          <div className="bg-gradient-to-r from-rosa-400 to-rosa-600 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Mundo de Doces da GG</h3>
                <p className="text-white/70 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full" /> Assistente Virtual
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors" aria-label="Fechar chat">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-rosa-50/20 dark:bg-[#0b141a]">
            {displayMessages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'bot' ? 'bg-rosa-100 dark:bg-rosa-500/20' : 'bg-gray-700 dark:bg-[#2a3841]'}`}>
                  {msg.sender === 'bot' ? <Bot className="w-4 h-4 text-rosa-500 dark:text-rosa-400" /> : <User className="w-4 h-4 text-white" />}
                </div>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-rosa-500 dark:bg-[#005c4b] text-white rounded-tr-sm'
                    : 'bg-white dark:bg-[#1f2c33] border border-gray-100 dark:border-[#2a3841] text-gray-700 dark:text-[#e9edef] rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-rosa-100 dark:bg-rosa-500/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-rosa-500 dark:text-rosa-400" />
                </div>
                <div className="bg-white dark:bg-[#1f2c33] border border-gray-100 dark:border-[#2a3841] px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-300 dark:bg-[#667781] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-300 dark:bg-[#667781] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-300 dark:bg-[#667781] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-gray-50 dark:border-gray-800 bg-white dark:bg-gray-900">
            {QUICK_REPLIES.map(reply => (
              <button key={reply} onClick={() => handleSend(reply)} className="px-3 py-1.5 rounded-full text-xs font-medium bg-rosa-50 border border-rosa-200 text-rosa-600 hover:bg-rosa-100 transition-colors">
                {reply}
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2">
              <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                placeholder={t('escreva_mensagem')}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#2a3841] bg-white dark:bg-[#1f2c33] text-gray-900 dark:text-[#e9edef] placeholder:text-gray-400 dark:placeholder:text-[#667781] focus:border-rosa-300 focus:ring-2 focus:ring-rosa-100 outline-none text-sm"
              />
              <button onClick={() => handleSend(input)} disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-rosa-500 text-white hover:bg-rosa-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
