-- ============================================
-- TABELAS DE CHAT + CUPONS — Mundo de Doces da GG
-- Executa este script no SQL Editor do Supabase
-- ============================================

-- ⚽ TABELA DE CUPONS (FIFA World Cup 2026)
CREATE TABLE IF NOT EXISTS public.cupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  desconto INTEGER NOT NULL DEFAULT 15,
  descricao TEXT DEFAULT 'Desconto FIFA World Cup 2026',
  usado BOOLEAN DEFAULT false,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  expira_em DATE DEFAULT '2026-07-19'
);

-- Política RLS
ALTER TABLE public.cupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura pública de cupons" ON public.cupons FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir inserção pública de cupons" ON public.cupons FOR INSERT TO anon WITH CHECK (true);

-- Inserir o cupom COPA2026 (15% de desconto)
INSERT INTO public.cupons (codigo, desconto, descricao, expira_em)
VALUES ('COPA2026', 15, '15% OFF — Promoção FIFA World Cup 2026', '2026-07-19')
ON CONFLICT (codigo) DO NOTHING;

-- 1. Tabela de mensagens
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  text TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'bot', 'agent')),
  timestamp BIGINT NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para consultas rápidas por sessão
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON public.chat_messages(session_id, timestamp);

-- 2. Tabela de sessões
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id TEXT PRIMARY KEY,
  client_name TEXT DEFAULT 'Cliente Anónimo',
  client_email TEXT DEFAULT '',
  client_phone TEXT DEFAULT '',
  last_message TEXT DEFAULT '',
  last_timestamp TEXT DEFAULT '',
  status TEXT DEFAULT 'bot' CHECK (status IN ('bot', 'waiting', 'active', 'closed')),
  unread_by_agent BOOLEAN DEFAULT false,
  unread_by_client BOOLEAN DEFAULT false,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Políticas RLS
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

-- Permitir TUDO para anon (leitura, escrita, atualização)
CREATE POLICY "Permitir tudo em chat_messages" ON public.chat_messages FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo em chat_sessions" ON public.chat_sessions FOR ALL TO anon USING (true) WITH CHECK (true);

-- 4. Habilitar Realtime (para atualizações em tempo real)
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_sessions;
